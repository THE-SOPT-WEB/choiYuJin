const $ = (selector) => document.querySelector(selector);

let totalAmount = $("#cart__amount__total");

const orderBtn = $(".cart__order");
const cancelBtn = $(".cart__cancel");

//주문하기 버튼 누르면 모달 보여주기.
function orderClick() {
  const modal = $(".modal");
  const noBtn = $(".modal__button__no");
  orderBtn.addEventListener("click", (e) => {
    modal.classList.remove("hidden");
    //아니요 누르면 모달 숨기기.
    noBtn.addEventListener("click", (e) => {
      modal.classList.add("hidden");
    });
  });
}

//취소하기 버튼 클릭하면 장바구니 비우기.
function cancelClick() {
  cancelBtn.addEventListener("click", (e) => {
    //.cart__list__list class 가진 요소 모두 제거.
    const lists = document.querySelectorAll(".cart__list__list");
    lists.forEach(function (list) {
      list.remove();
    });
    totalAmount.innerText = 0;
    localStorage.clear();
  });
}

//누적금액 계산
function calcTotalAmount(cartList) {
  let total = 0;
  for (let i = 0; i < cartList.children.length; i++) {
    const howMany = cartList.children[i].querySelector(
      ".cart__list__number"
    ).value;
    const howMuch = toNumber(
      cartList.children[i].querySelector(".cart__list__price").innerText
    );
    total += howMany * howMuch;
  }
  totalAmount.innerText = total;
}

//장바구니에 추가.
function order({ burgerCard, cartList }) {
  burgerCard.addEventListener("click", (e) => {
    //"선택된 "버거 카드.
    e.target.closest(".burger__card");
    const selectedCard = e.target.closest(".burger__card");

    if (selectedCard != null) {
      const burgerName = selectedCard.children[1].firstElementChild;
      const burgerPrice =
        selectedCard.children[1].firstElementChild.nextElementSibling;

      function checkCart(burgerName) {
        //현재 카트에 있는 리스트 변수 선언. htmlcollection(유사배열)
        const nameList = document.getElementsByClassName("cart__list__name");

        for (let i = 0; i < nameList.length; i++)
          if (burgerName.innerText === nameList[i].innerText) {
            nameList[i].parentElement.querySelector(".cart__list__number")
              .value++;
            return true;
          }
        return false;
      }

      //선택한 버거가 이미 카트에 있는지 확인.
      if (checkCart(burgerName) === false) {
        $("aside.cart").classList.remove("shaking");
        const burgerNameTxt = burgerName.innerText;
        const burgerPriceTxt = burgerPrice.innerText;
        addOrder(burgerNameTxt, burgerPriceTxt, cartList);
        $("aside.cart").classList.add("shaking");
      }
      calcTotalAmount(cartList);
    }

    //버거 추가 시 localStorage에 저장.
    function handleLocalStorage() {
      for (let i = 0; i < cartList.children.length; i++) {
        const info = [
          //수량
          cartList.children[i].children[1].value,
          //가격
          cartList.children[i].children[2].innerText,
        ];
        localStorage.setItem(
          cartList.children[i].children[0].innerText,
          JSON.stringify(info)
        );
      }
    }
    handleLocalStorage();
  });
}

//장바구니에 list 추가.
function addOrder(burgerNameTxt, burgerPriceTxt, cartList, burgerQty) {
  const burgerLi = document.createElement("li");
  burgerLi.className = "cart__list__list";

  //장바구니 list 내 버거 이름.
  const span = document.createElement("span");
  span.className = "cart__list__name";
  span.innerText = burgerNameTxt;

  //장바구니 list 내 버거 개수.
  const input = document.createElement("input");
  input.className = "cart__list__number";
  input.type = "number";
  input.value = burgerQty || 1;
  //장바구니 양 변경 감지 후 누적금액 계산.
  input.addEventListener("input", () => {
    calcTotalAmount(cartList);
    handleLocalStorage();
  });

  //장바구니 list 내 버거 가격.
  const div = document.createElement("div");
  div.className = "cart__list__price";
  div.innerText = burgerPriceTxt;

  //장바구니 list 내 취소 버튼
  const button = document.createElement("button");
  button.innerText = "X";
  button.onclick = () => {
    burgerLi.remove();
    localStorage.removeItem(burgerLi.children[0].innerText);
    calcTotalAmount(cartList);
  };

  const addList = [span, input, div, button];
  addList.forEach(function (tag) {
    burgerLi.appendChild(tag);
  });

  cartList.appendChild(burgerLi);
}

function toNumber(burgerPrice) {
  const removedComma = burgerPrice.slice(0, -1).replace(/\D/g, "");
  return +removedComma;
}

function getStorageInfo(cartList) {
  for (let i = 0; i < window.localStorage.length; i++) {
    const burgerName = window.localStorage.key(i);
    //info[1] 가격 , info[0] 수량.
    const info = JSON.parse(window.localStorage.getItem(burgerName));
    addOrder(burgerName, info[1], cartList, info[0]);
  }
  calcTotalAmount(cartList);
}

const cartList = $("ul.cart__list");
getStorageInfo(cartList);

function cartManager(burgerInfo) {
  order(burgerInfo);
  cancelClick();
  orderClick();
}

window.onload = () => {
  cartManager({
    cartList: $("ul.cart__list"),
    burgerCard: $("section.burger"),
  });
};
