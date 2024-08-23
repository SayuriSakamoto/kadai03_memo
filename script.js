document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cart-btn');
    const cartListElement = document.getElementById('cart-items');
    const searchBox = document.getElementById('search-box');
    let cart = [];
    let totalAmount = 0;

    // 各商品の価格を設定
    const productPrices = {
        1: 220,  // 有機にんじん（例: 220円）
        2: 425,  // 有機たまねぎ
        3: 48,   // 緑豆もやし
        4: 199,  // 長ネギ
        5: 250,  // ミニトマト
        6: 230,  // なす
        7: 130,  // ニラ
        8: 160,  // ピーマン
        9: 220,  // レタス
        10: 350, // さつまいも
        11: 190, // しいたけ
        12: 298  // アボカド
    };

     // ローカルストレージからカートの中身を読み込む
     loadCart();

    // カートに追加するボタンがクリックされたときの処理
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const productId = index + 1;  // 商品IDは1から始まる
            const productName = this.parentElement.querySelector('p').textContent;
            alert(productName + ' を購入しました！');
            addToCart(productId, productName);
        });
    });

    // カートに商品を追加する関数
    function addToCart(productId, productName) {
        cart.push({ id: productId, name: productName, price: productPrices[productId] });
        totalAmount += productPrices[productId];
        updateCartDisplay();
        saveCart(); // カートをローカルストレージに保存
        updateCartDisplay();
    }

    // カートの表示を更新する関数
    function updateCartDisplay() {
        cartListElement.innerHTML = '';
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - ¥${item.price}`;
            cartListElement.appendChild(listItem);
        });
        cartBtn.textContent = `カート (${cart.length}個)　: 合計　¥${totalAmount}`; // カートボタンに商品数と合計金額を表示
    }


   // カートの中身をローカルストレージに保存する関数
   function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalAmount', totalAmount.toString());
}

// カートの中身をローカルストレージから読み込む関数
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    const savedTotalAmount = localStorage.getItem('totalAmount');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    if (savedTotalAmount) {
        totalAmount = parseInt(savedTotalAmount, 10);
    }
    updateCartDisplay();
}



   

     // お気に入りリストの読み込み
     loadFavorites();

    // お気に入りボタンがクリックされたときの処理
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.parentElement.querySelector('p').textContent;
            addToFavorites(product);
            alert(product + ' をお気に入りに追加しました！');
        });
    });

    // お気に入りリストに商品を追加する関数
    function addToFavorites(product) {
        const favoriteList = document.getElementById('favorites');
        const listItem = document.createElement('li');
        listItem.textContent = product;
        favoriteList.appendChild(listItem);
        saveFavorites(); // お気に入りをローカルストレージに保存
    
    }


     // お気に入りリストをローカルストレージに保存する関数
     function saveFavorites() {
        const favorites = Array.from(document.querySelectorAll('#favorites li')).map(li => li.textContent);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // お気に入りリストをローカルストレージから読み込む関数
    function loadFavorites() {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            const favorites = JSON.parse(savedFavorites);
            favorites.forEach(product => {
                const favoriteList = document.getElementById('favorites');
                const listItem = document.createElement('li');
                listItem.textContent = product;
                favoriteList.appendChild(listItem);
            });
        }
    }

      // 検索窓の入力に基づいて商品をフィルタリングする
      searchBox.addEventListener('input', function() {
        const searchTerm = searchBox.value.toLowerCase();
        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            const productName = product.querySelector('p').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});
