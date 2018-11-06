ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map("map", {
        // Центр карты, указываем коордианты
        center:[55.893698, 37.520686],
        // Масштаб, тут все просто
        zoom: 15.5,
        // Отключаем все элементы управления
        controls: []
    }); 
                
    var myGeoObjects = [];
        
    // Наша метка, указываем коордианты
    myGeoObjects = new ymaps.Placemark([55.893698, 37.520686],{
        contentHeader: 'NRGCone',
        balloonContentBody: 'Доберись до нас и передай этот челлендж трем друзьям (или врагам)',
        },{
        iconLayout: 'default#image',
        // Путь до нашей картинки
        iconImageHref: 'pile-of-poo_pointer1.png', 
        // Размер по ширине и высоте
        iconImageSize: [40, 50],
        // Смещение левого верхнего угла иконки относительно
        // её «ножки» (точки привязки).
        iconImageOffset: [-35, -40]
    });
                    
    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: false,
        clusterOpenBalloonOnClick: false,
    });
        
    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);
    // Отлючаем возможность изменения масштаба
    myMap.behaviors.disable('scrollZoom');
    myMap.controls.add("zoomControl", {
        position: {top: 200, left: 15}
    });
}