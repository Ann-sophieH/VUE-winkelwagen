const app = Vue.createApp({ // -in 2e fase creert dit enkel nog een variabele aan app wordt dan component gekoppeld
    data(){ // WAT HIER STAAT ZIJN GLOBALE WAARDEN VOOR HELE APP wordt als eerste opgehaald door html
        return{
            winkelwagen: [], //globale variabele in main.js //gaan er array van maken want in een ww zitten items
            gold: true, //hier wordt de waarde van de globale
        }
    },
    methods:{
        updateWinkelwagen(id){
            this.winkelwagen.push(id); //telt winkelwagen op bij klik //nu gaan we id zetten die voor de index zal staan van het item in de cart/komt van soortId uit 'soorten'
        }
    }
})
//aan een van de directives wordt een condition gekoppeld