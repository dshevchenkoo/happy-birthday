(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     		this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://pp.userapi.com/c849536/v849536491/1260a6/wta6Hmivou0.jpg"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "withMe",
			img: "https://pp.userapi.com/c849228/v849228691/12b98e/6NjUBEACsks.jpg",
			id: 1,
		},
		{
			name: "two",
			img: "https://pp.userapi.com/c849228/v849228691/12b997/THgd7q6wAVY.jpg",
			id: 2
		},
		{
			name: "svadba",
			img: "https://pp.userapi.com/c849228/v849228691/12b9a0/qMnPYbd4ln8.jpg",
			id: 3
		},
		{
			name: "together",
			img: "https://pp.userapi.com/c849228/v849228691/12b9aa/frtCvbUaOyk.jpg",
			id: 4
		}, 
		{
			name: "VV",
			img: "https://pp.userapi.com/c849228/v849228691/12b9b4/4LVi_t7YncM.jpg",
			id: 5
		},
		{
			name: "withN",
			img: "https://pp.userapi.com/c849228/v849228691/12b9be/J3hpBJURTqs.jpg",
			id: 6
		},
		{
			name: "withS",
			img: "https://pp.userapi.com/c849228/v849228691/12b9c8/vSdbpTc4d6c.jpg",
			id: 7
		},
		{
			name: "VV2",
			img: "https://pp.userapi.com/c849228/v849228691/12b9d2/khwIqSdkc18.jpg",
			id: 8
		},
		{
			name: "withPets",
			img: "https://pp.userapi.com/c849228/v849228691/12b9dc/zslSs-N2-vQ.jpg",
			id: 9
		},
		{
			name: "VVP",
			img: "https://pp.userapi.com/c849228/v849228691/12b9e6/h21hUvo5lQ0.jpg",
			id: 10
		},
		{
			name: "withAV",
			img: "https://pp.userapi.com/c849228/v849228691/12b9f0/v0eU_0fcIts.jpg",
			id: 11
		},
		{
			name: "withAV2",
			img: "https://pp.userapi.com/c849228/v849228691/12b9fa/OTQKaRVJlqc.jpg",
			id: 12
		},
	];
    
	Memory.init(cards);


})();