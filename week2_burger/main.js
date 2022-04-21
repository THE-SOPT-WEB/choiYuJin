const $ = (selector) => document.querySelector(selector);

let totalAmount = $('#cart__amount__total');

const orderBtn = $('.cart__order');
const cancelBtn = $('.cart__cancel');

//주문하기 버튼 클릭
function orderClick() {
  orderBtn.addEventListener('click', (e) => {
    const modal = $('.modal')
    modal.classList.remove('hide')
  })
}

//취소하기 버튼 클릭
function cancelClick({cartList}) {
  cancelBtn.addEventListener('click', (e) => {
    //.cart__list__list class 가진 요소 모두 제거. 장바구니 목록 비우기. 
    const lists = document.querySelectorAll('.cart__list__list')
    lists.forEach(function(list){
      list.remove();
    })
    totalAmount.innerText = 0;
  })
}

//누적금액 계산
function calcTotalAmount(cartList) {
  let total = 0;
  for (let i = 0; i < cartList.children.length; i++) {
    let howMany = cartList.children[i].querySelector('.cart__list__number').value;
    let howMuch = toNumber(cartList.children[i].querySelector('.cart__list__price').innerText);
    total += howMany * howMuch;
  }
  totalAmount.innerText = total;
}

//장바구니에 추가.
function order({burgerCard, cartList}) {
  burgerCard.addEventListener('click', (e) => {
    //"선택된 "버거 카드.
    const selectedCard = e.target.closest('.burger__card');

    //"선택한 버거"에서 원하는 정보 변수로 선언.
    const burgerName = selectedCard.children[1].firstElementChild;
    const burgerPrice = selectedCard.children[1].firstElementChild.nextElementSibling;
    //카드가 아닌 부분 선택시 오류 생김. 

    //장바구니에 list 추가.
    function addOrder(burgerName, burgerPrice) {
      const burgerLi = document.createElement('li');
      burgerLi.className = 'cart__list__list';

      const span = document.createElement('span');
      span.className = 'cart__list__name';
      span.innerText = burgerName.innerText;

      const input = document.createElement('input');
      input.className = 'cart__list__number';
      input.type = "number";
      input.value = 1;
      //장바구니 양 변경 시 감지 후 누적금액 계산.
      input.addEventListener('input', (e) => {
        calcTotalAmount(cartList);
      })

      const div = document.createElement('div');
      div.className = 'cart__list__price';
      div.innerText = burgerPrice.innerText;

      //취소 버튼
      const button = document.createElement('button');
      button.innerText = 'X';
      button.onclick = () => {
        burgerLi.remove();
        calcTotalAmount(cartList);
      }

      burgerLi.appendChild(span);
      burgerLi.appendChild(input);
      burgerLi.appendChild(div);
      burgerLi.appendChild(button);

      cartList.appendChild(burgerLi);

      calcTotalAmount(cartList);
      }

    //선택한 버거가 이미 카트에 있는지 확인.
    function checkCart(burgerName) {
      //현재 카트에 있는 리스트 변수 선언. htmlcollection(유사배열)
      const nameList = document.getElementsByClassName("cart__list__name");

      for (let i = 0; i < nameList.length - 1; i++)
        if (burgerName.innerText === nameList[i].innerText){
          nameList[i].parentElement.querySelector(".cart__list__number").value++;
          return true;
        }
      return false;
    }

    addOrder(burgerName, burgerPrice);
    if (checkCart(burgerName)) {
      cartList.lastElementChild.remove();
      calcTotalAmount(cartList);
    }

  
    

    // if (checkCart(burgerName)) {
    //   burgerLi.parentElement.remove();

    // }

  
    })

  }



function toNumber(burgerPrice) {
	const removedComma = burgerPrice.slice(0, -1).replace(/\D/g, "");
  return +removedComma;
};

function cartManager(burgerInfo) {
  order(burgerInfo);
  cancelClick(burgerInfo);
}

window.onload = () => {
  cartManager({
    cartList: $('ul.cart__list'),
    burgerCard: $('section.burger'),
  });
}