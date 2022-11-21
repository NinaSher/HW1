export class Card{
	constructor(dataCat, selectorTempate, handeleCatTitle){
		this._data = dataCat;
		this._handeleCatTitle = handeleCatTitle;
		this._selectorTempate = selectorTempate;
	}
	_getTemplate(){
		return document.querySelector(this._selectorTempate).content.querySelector(".card")
	}
	getElement(){
		this.element = this.getTempate().cloneNode(true);
		this.cardTitle = this.element.querySelector(".card__name");
		this.cardImage = this.element.querySelector(".card__image");
		this.cardLike = this.element.querySelector(".card__like");
		if(!this.data.favourite){
			this.cardLike.remove()
		}
		this.cardTitle.textContent=this._data.mame;
		this.cardImage.src=this._data.img_link;
		
		this.setEventListner();
		return this.element;
	}
	setEventListner(){
		this.cardTitle.addEventListener("click", this._handeleCatTitle)
	}
}
function createCat(dataCat){
	const cardInstance = new Card(
		dataCat,
		"#card-template",
		handeleCatTitle
	);
	const newCardElement = cardInstance.getElement();
	cardsContainer.append(newCardElement);
}
export class CatsInfo{
	constructor(
		selectorTempate,
		handeleEdiitCatInfo,
		handelLikeCat,
		handelDeleteCat
		){
		this._selectorTempate = selectorTempate;
		this._handeleEdiitCatInfo = handeleEdiitCatInfo;
		this._handelLikeCat = handelLikeCat;
		this._handelDeleteCat = handelDeleteCat;
		this._data = {};
	}


	setData() {

	}

	getTempate(){
		return document.querySelector(this._selectorTempate).content.children[0];
	}

	getElement(){
		this.element = this.getTempate().cloneNode(true);

	}

}

const popupCatInfo = new Popup("popup-cat-info");
popupCatInfo.setEventListner();

function handeleCatTitle(){
	popupCatInfo.open()
}

