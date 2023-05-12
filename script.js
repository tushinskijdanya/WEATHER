//Блок контроля
let renovate = document.querySelector('.btn_renovate');

renovate.addEventListener('click', () => {
    getLinkToImage()
})

function getLinkToImage () {
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=MQU3vLz6FKUeVHpPP_3co_sJ92br7nOsbnCutMIZUcs';
    fetch(url)
   .then(res => res.json())
   .then(data => {
    changeBackground(data.urls.regular)
   });
}

function changeBackground(data) {
    document.querySelector('.container').style.backgroundImage = `url(${data})`;
}
