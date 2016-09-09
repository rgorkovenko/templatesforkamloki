$(document).ready(function(){

	// слайдер на главной
	// первый элемент в слайдере на главной делаем активным
	$('.categories_slider .slider_item:first-child').addClass('active');
	$('.categories_slider .slider_item:first-child').fadeIn();

	// считаем количество элементов в слайдере на главной
	var MySliderCount = $('.categories_slider .slider_item').length;
	// выводим навигацию для слайдера и расставим id для слайдов
	MySliderCount = MySliderCount - 1;
	for (var i = 0; i <= MySliderCount; i++) {
		$('ul#categories_slider_nav').append('<li class="trs" id="s_' + i + '"></li>');
		$('.categories_slider .slider_item:eq(' + i +')').attr('id', 'sl_' + i);
	}
	// первый элемент в навигации текущий
	$('ul#categories_slider_nav li:first-child').addClass('current');
	
	// отрабатываем клик на пункт навигации слайдере
	$('#categories_slider_nav li').click(function() {
		var MyNavId = $(this).attr('id');
		var MyCurrentNavNum = MyNavId.split('_')[1];
		$('.categories_slider .slider_item').stop().fadeOut('slow');
		$('.categories_slider .slider_item div').removeClass('activec');
		$('.categories_slider .slider_item div').addClass('passive');
		$('.categories_slider .slider_item').removeClass('active');
		$('#sl_' + MyCurrentNavNum).addClass('active');
		$('#sl_' + MyCurrentNavNum).stop().fadeIn('slow');
		$('#categories_slider_nav li').removeClass('current');
		$(this).addClass('current');
		setTimeout(function() {
			$('#sl_' + MyCurrentNavNum + ' .slider_item_content').removeClass('passive');
			$('#sl_' + MyCurrentNavNum + ' .slider_item_content').addClass('activec');
		}, 1500);
		
		clearInterval(timer);
		//setInterval(ChangeSlide, 10000);
	})
	
	function ChangeSlide() {
		var MyNavId = $('#categories_slider_nav .current').attr('id');
		var MyCurrentNavNum = MyNavId.split('_')[1];
		$('.categories_slider .slider_item').stop().fadeOut(750);
		$('.categories_slider .slider_item div').removeClass('activec');
		$('.categories_slider .slider_item div').addClass('passive');
		$('#categories_slider_nav li').removeClass('current');
		MyCurrentNavNum = +MyCurrentNavNum + 1;
		var MySliderCount = $('.categories_slider .slider_item').length;
		var MySliderCount = +MySliderCount - 1;
		if (MyCurrentNavNum > MySliderCount) {
			MyCurrentNavNum = 0;
		}
		$('.categories_slider .slider_item').removeClass('active');
		$('#sl_' + MyCurrentNavNum).addClass('active');
		$('#sl_' + MyCurrentNavNum).stop().fadeIn(750);
		$('#s_' + MyCurrentNavNum).addClass('current');
		setTimeout(function() {
			$('#sl_' + MyCurrentNavNum + ' .slider_item_content').removeClass('passive');
			$('#sl_' + MyCurrentNavNum + ' .slider_item_content').addClass('activec');
		}, 1500);
	}
	
	
	// объявим глобальную переменную таймер
	var timer;
	// запустим смену слайдов через 5 сек после загрузки страницы
	timer = setInterval(ChangeSlide, 10000);
	
	
	// открыть форму обратный звонок
	$('.call_order').click(function() {
		$('.fon').fadeIn();
		$('.call_form').fadeIn();
	})
	// закрыть форму обратный звонок
	$('.fon').click(function() {
		$('.lightbox').fadeOut();
		$('.fon').fadeOut();
		$('.call_form').fadeOut();
	})
	// закрыть форму обратный звонок при нажатии на крестик
	$('.close').click(function() {
		$('.fon').fadeOut();
		$('.lightbox').fadeOut();
		$('.call_form').fadeOut();
	})
	
	
	//
	// слайдер Выгодные предложения
	var ProCount = $('.pro_sli .pro_item').length;
	// адаптируем ширину элементов слайдера
	var ProSliderWidth = $('.pro_slider').width();
	var ProItemWidth = (ProSliderWidth) / 5;
	$('.pro_item').css('width', ProItemWidth + 'px');
	var ProSliWidth = ProItemWidth * ProCount;
	$('.pro_sli').css('width', ProSliWidth + 'px');
	// клик влево
	$('#pro_prev').click(function() {
		var CurrentPosition = $('.pro_sli').position().left;
		var NewLeftPos = CurrentPosition + ProItemWidth - 30;
		if (NewLeftPos > 0) {
			NewLeftPos = -1 * (ProCount - 5) * ProItemWidth;
		}
		$('.pro_sli').css('left', NewLeftPos + 'px');
		// общая ширина для бегунка
		var MyLineWidth = $('.line').width();
		// определим смещение влево
		var MyProportion = -1 * NewLeftPos / ((ProCount - 5) * ProItemWidth);
		// сместим ползунок
		var NewMarkLeft = MyLineWidth * MyProportion;
		$('.mark').css('left', NewMarkLeft + 'px');
	})
	// клик вправо
	$('#pro_next').click(function() {
		var CurrentPosition = $('.pro_sli').position().left;
		var NewLeftPos = CurrentPosition - ProItemWidth - 30;
		if (NewLeftPos < -1 * (ProCount - 5) * ProItemWidth) {
			NewLeftPos = 0;
		}
		$('.pro_sli').css('left', NewLeftPos + 'px');
		// общая ширина для бегунка
		var MyLineWidth = $('.line').width();
		// определим смещение влево
		var MyProportion = -1 * NewLeftPos / ((ProCount - 5) * ProItemWidth);
		// сместим ползунок
		var NewMarkLeft = MyLineWidth * MyProportion;
		$('.mark').css('left', NewMarkLeft + 'px');
	})
	
	// подключим ползунок mark
	$('.mark').draggable({axis:'x',containment:'parent'});
	// переместим слайдер по позиции маркера
	$('.mark').mouseup(function() {
		var MarkLeft = $(this).position().left;
		var MaxLeft = $('.line').width();
		// определим единую пропорцию смещения маркера и слайдера
		var MyProportion = MarkLeft / MaxLeft;
		// сместим слайдер на данную пропорцию
		var NewLeftPos = -1 * (ProCount - 5)  * ProItemWidth * MyProportion;
		$('.pro_sli').css('left', NewLeftPos + 'px');
	})
	
	
	// страница подкатегории
	// вкладки для списка товаров
	$('ul.tab li:eq(1)').addClass('active');
	$('div.tabs div:eq(1)').addClass('active');
	$('div.order div:eq(1)').addClass('active');
	
	// отрабатываем клик на вкладку
	$('ul.tab li').click(function() {
		var MyNavId = $(this).attr('id');
		var MyCurrentNavNum = MyNavId.split('_')[1];
		$('ul.tab li').removeClass('active');
		$('div.tabs div').removeClass('active'); // для подкатегории
		$('div.order div').removeClass('active'); // для оформления заказа
		$('#t_' + MyCurrentNavNum).addClass('active'); // для подкатегории
		$('#f_' + MyCurrentNavNum).addClass('active'); // для оформления заказа
		$('.tab_' + MyCurrentNavNum).addClass('active');
	})
	
	// корзина
	// модуль корзины в шапке сайта
	// откроем / закроем корзину по клику
	$('.cart').live('click', function() {
		var CartTop = $('.full_cart').position().top;
		if ( CartTop != 0 ) {
			$('.full_cart').css('top', '0px');
			$('.cart_arrow').css('transform', 'rotate(180deg)');
		} else {
			$('.full_cart').css('top', '-500px');
			$('.cart_arrow').css('transform', 'rotate(0deg)');
		}
	})	
	// клик в таблице товаров по плюсу
	$('span.plus').live('click', function() {
		var Qua = $(this).next('input').val();
		var NewQua = +Qua + 1;
		$(this).next('input').val(NewQua).change();
	})
	// клик в таблице товаров по минусу
	$('span.minus').live('click', function() {
		var Qua = $(this).prev('input').val();
		var NewQua = +Qua - 1;
		if (NewQua == 0) {
			$(this).prev('input').val(1).change();
		} else {
			$(this).prev('input').val(NewQua).change();
		}
	})

	function update_kolvomini() {

	}

	$('.quantity input.quantity').live('change',function(){
		tid = $(this).attr('data-tid');
		kolvo = $(this).val();
		url = '/cart/update/'+tid+'/'+kolvo+'/'; 
		jq_el = ".mini"
		if ( $(this).hasClass("nano") ) {
			url += "?nano=1"
			jq_el = '.mini .cart_title';
		}
		$(jq_el).load(url);
		
		var price = $(this).parent().parent().find('.price').text();
		new_sum = ''+ Math.round(price.replace(',','.')*kolvo*100)/100;
		$(this).parent().parent().find('.summa').text( new_sum.replace('.',','));
	})

	// удалить строку товара из корзины
	$('span.delete').live('click', function() {
		tid = $(this).attr('data-tid');
		url = '/cart/del/'+tid+'/';
		jq_el = ".mini"
		if ( $(this).hasClass("nano") ) {
			url += "?nano=1"
			jq_el = '.mini .cart_title';
		}
		$(jq_el).load(url);
		$(this).closest('tr').empty();
	})
	
	
	// левое меню аккордеон
	$('ul.leftmenu li').click(function() {
		$('ul.leftmenu li').removeClass('current');
		$(this).addClass('current');
	})
	// уберем стрелку в пункте меню, если нет дочерних элементов
	$('ul.leftmenu li ul').each(function(indx, element){
		if ($(element).is(':has(li)')) {
			$(element).parent().addClass('has_li');
		} else {
			$(element).parent().addClass('nohas_li');
		}
	})
	
	
	
	
	// карточка товара
	// главное изображение
	$('.images img:first-child').addClass('main_image');
	// меняем главное изображение по клику
	$('.images img').click(function() {
		var MySrc = $(this).attr('src');
		$('.images img').removeClass('main_image');
		$(this).addClass('main_image');
		$('.product_image').attr('src', MySrc);
		
	})
	
	// последние просмотренные товары
	var LatestCount = $('ul.latest_ul li').length;
	var LatestLi = $('ul.latest_ul li').width();
	var LatestWidth = LatestCount * LatestLi;
	$('ul.latest_ul').css('width', LatestWidth + 'px' );
	// присвоим активный класс 1 элементу в списке
	$('ul.latest_ul li:first-child').addClass('active');
	// счетчик активного пункта MyNumActive
	var MyNumActive = 0;
	
	
	// клик следующий
	$('.latest_next').click(function() {
		var CurrentPosition = $('.latest_ul').position().left;
		var NewLeftPos = CurrentPosition - LatestLi;
		MyNumActive = MyNumActive + 1;
		if (NewLeftPos < -1 * (LatestCount - 1) * LatestLi) {
			NewLeftPos = 0;
		}
		if (MyNumActive == LatestCount) {
			MyNumActive = 0;
		}
		$('.latest_ul').css('left', NewLeftPos + 'px');
		$('.latest_ul li').removeClass('active');
		$('.latest_ul li').eq(MyNumActive).addClass('active');
	})
	
	// клик влево
	$('.latest_prev').click(function() {
		var CurrentPosition = $('.latest_ul').position().left;
		var NewLeftPos = CurrentPosition + LatestLi;
		MyNumActive = MyNumActive - 1;
		if (NewLeftPos > 0) {
			NewLeftPos = -1 * (LatestCount - 1) * LatestLi;
		}
		if (MyNumActive == -1) {
			MyNumActive = LatestCount - 1;
		}
		$('.latest_ul').css('left', NewLeftPos + 'px');
		$('.latest_ul li').removeClass('active');
		$('.latest_ul li').eq(MyNumActive).addClass('active');
	})
	
	// лайтбокс
	$('img.product_image').click(function() {
		var ImgSrc = $('img.product_image').attr('src');
		var img = new Image();
		img.onload = function() {
			var ImgW = this.width;
			var ImgH = this.height;
					
			var MrgL = -1 * ImgW / 2;
			var MrgT = -1 * ImgH / 2;
		
			$('.lightbox').css('margin-left', MrgL + 'px');
			$('.lightbox').css('margin-top', MrgT + 'px');
			$('.img_kont').html('<img src="'+ ImgSrc +'">');
			
			$('.fon').fadeIn();
			$('.lightbox').fadeIn();
		}
		img.src = ImgSrc;
		})
	
	// примечание к оптовой цене
	$('.opt').hover(
	function() {
		$('.opt_more').fadeIn();
	},
	function() {
		$('.opt_more').fadeOut();
	})
	
	
	$(".add-to-cart").click( function() {
		tid = $(this).attr('data-tid');
		kolvo = $(this).parent().parent().find('input[name="quantity"]').val();
		url = '/cart/add/'+tid+'/'+kolvo+'/';

		$(".mini").load(url, function(){
   			alert("Товар успешно добавлен");
 		});
		
		return false;

	});
	

    var senddata = {
        url: '/call/',
        dataType: 'json',
        success: process_call,
        beforeSubmit: before_call
    };

    $('#call_form').ajaxForm(senddata);

	function before_call() {
	    $('div.error').fadeOut().text('');
	    return true;
	}

    function process_call(data) {
        if (data) {
            e_msg = "";
            if (!eval(data.valid)) {
                errors = eval(data.errs);
                $.each(errors, function(fieldname, errmsg) {
                    if (fieldname == "__all__") {
                        e_msg += errmsg;
                        $('#errmsg').html(e_msg).fadeIn("slow");
                    } else {
                        id = "#call_form [name='" + fieldname + "']";
                        $(id).parent().find(".error.form_"+fieldname).html(errmsg).fadeIn();
                    }
                });
            } else if (eval(data.valid)) {
                $('.wrapFormContent').remove();
                e_msg = "Спасибо за обращение.<br />Наш специалист в ближайшее время свяжется с вами.<style>#call_form input {display:none;}</style>";
                $('#call_form #emsg').html(e_msg).fadeIn("slow");
                $('#call_form input[type="text"]').val('');
            }
            $('#errmsg').html(e_msg).fadeIn("slow");
        } else {
            $('#emsg').text("Ajax error: no data received.").fadeIn("slow");
        }
    }


    var senddata = {
        url: '/cart/f1/',
        dataType: 'json',
        success: process_form1,
        beforeSubmit: before_form1
    };
    $('#form1').ajaxForm(senddata);

    var senddata = {
        url: '/cart/f2/',
        dataType: 'json',
        success: process_form1,
        beforeSubmit: before_form1
    };
    $('#form2').ajaxForm(senddata);

    var senddata = {
        url: '/cart/f3/',
        dataType: 'json',
        success: process_form1,
        beforeSubmit: before_form1
    };   
    $('#form3').ajaxForm(senddata);

	function before_form1() {
	    $('div.error').fadeOut().text('');
	    return true;
	}

    function process_form1(data) {
        if (data) {
            e_msg = "";
            if (!eval(data.valid)) {
                errors = eval(data.errs);
                $.each(errors, function(fieldname, errmsg) {
                    if (fieldname == "__all__") {
                        e_msg += errmsg;
                        $('#errmsg').html(e_msg).fadeIn("slow");
                    } else {
                        id = "[name='" + fieldname + "']";
                        $(id).parent().find(".error.form_"+fieldname).html(errmsg).fadeIn();
                    }
                });
            } else if (eval(data.valid)) {
                $('.wrapFormContent').remove();
                e_msg = "Спасибо за обращение. <br /><br /> Наш специалист в ближайшее время свяжется с вами.";
                $('#form1 #emsg').html(e_msg).fadeIn("slow");
                window.location = '/thanks/';
                //$('#form1 input[type="text"]').val('');
            }
            $('#errmsg').html(e_msg).fadeIn("slow");
        } else {
            $('#emsg').text("Ajax error: no data received.").fadeIn("slow");
        }
    }
	
	
})

