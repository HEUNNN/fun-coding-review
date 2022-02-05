const backToTop = document.getElementById('backtotop');

const checkScroll = () => { //scroll 발생하면 backToTop button 생기도록 하는 func 
    const pageYoffset = window.pageYOffset;
    if (pageYoffset) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

const moveBackToTop = () => { //backToTop button을 click 했을때 페이지의 top 부분으로 이동하도록 하는 func
    if (window.pageYOffset > 0) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

window.addEventListener('scroll', checkScroll);
backToTop.addEventListener('click', moveBackToTop);
/*---------------------------------------------------------------------------------------*/
const slideNextList = document.getElementsByClassName('slide-next');
/*몇번째 slide-next 아이콘 인지 알기 위함*/
function moveToPrev(event) {
    const slidePrev = event.target;
    const slideNext = slidePrev.nextElementSibling;
    const classList = slidePrev.parentElement.parentElement.nextElementSibling;
    let dataPosition = classList.getAttribute('data-position');

    if (dataPosition < 0) {
        dataPosition = Number(dataPosition) + 260;

        if (dataPosition >= 0) {
            slidePrev.style.color = "#cfd8dc";
            slidePrev.classList.remove('slide-prev-hover');
            slidePrev.removeEventListener('click', moveToPrev);
        }
        slideNext.style.color = "rgb(47, 48, 89)"
        slideNext.classList.add('slide-next-hover');
        slideNext.addEventListener('click', moveToNext);

        classList.style.transition = "transform 1s"
        classList.style.transform = "translateX(" + String(dataPosition) + "px)";
        classList.setAttribute('data-position', dataPosition);
    }
}
function moveToNext(event) {
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;
    //관련된 ul tag 선택하기
    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    let dataPosition = classList.getAttribute('data-position');

    const liList = classList.getElementsByTagName('li');
    if (classList.clientWidth < (liList.length * 260) + Number(dataPosition)) {
        dataPosition = Number(dataPosition) - 260; //왼쪽으로 이동
        if (classList.clientWidth > (liList.length * 260) + Number(dataPosition)) {
            slideNext.style.color = "#cfd8dc";
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click', moveToNext);
        }
        slidePrev.style.color = "rgb(47, 48, 89)";
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click', moveToPrev);
    }
    classList.style.transition = "transform 1s";
    classList.style.transform = "translateX(" + String(dataPosition) + "px)";
    classList.setAttribute('data-position', dataPosition);
    //overflow를 hidden으로 설정시 img가 짤림 -> overflow: visible;로 변경
}
for (let i = 0; i < slideNextList.length; i++) {
    /*어느 classList를 slide하고자 하는지 알기 위함 = 특정 ul tag 선택 */
    const classList = slideNextList[i].parentElement.parentElement.nextElementSibling;
    const liList = classList.getElementsByTagName('li');
    //class-card 한장의 width =240px, 한쪽 margin = 10px => total width = 240 + 20 = 260px
    if (classList.clientWidth < (liList.length * 260)) {
        slideNextList[i].classList.add('slide-next-hover');
        slideNextList[i].addEventListener('click', moveToNext);
    } else {
        /* 
            태그 삭제시, 부모 요소에서 removeChild를 통해 삭제해야 함
            따라서, 1. 먼저 부모요소를 찾아서
                  2. 부모 요소의 자식 요소로 있는 PREV, NEXT 요소를 삭제함        
        */
        const arrowContainer = slideNextList[i].parentElement;
        arrowContainer.removeChild(slideNextList[i].previousElementSibling);
        arrowContainer.removeChild(slideNextList[i]);
    }
}