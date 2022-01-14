app.component('product-weergave',{ //app komt van main js => const app: legt verbinding met object uit main = uitbreiding van object moet apart voor logische opbouwing
    props:{ //zijn attributen (zoals die van een tag bv img heeft alt enz)
        member:{
            type: Boolean,
            required: true,
        }
    },                                //componenten kunnen op elke pagina gebruikt worden
    template:                       //= volledige opbouw van html doc zelf: tussen backtics plaatsen! met methods en computed elementen
    ` <div class="col-lg-5">
        <img v-bind:src="image" class="img-fluid" alt="{{product}}"> <!--SHORTHAND NOTATIE V-BIN IS : !!! -->
        </div>
        <div class="col-lg-7 ">
            <h1>{{title}}</h1>
            <h2>{{merk}}</h2>
            <h2>&euro; {{prijs}}</h2>
            <p>{{beschrijving}}</p>
            <p>Voorraad: {{inVoorraad}}</p>
            <p>Verzendkosten:{{verzendkosten }}</p>
            <p v-if="inVoorraad > 9">In Voorraad: </p>
            <p v-else-if="inVoorraad > 0 && inVoorraad <= 9">laatste stuks</p> <!--als voorraad groter is dan 0 is en kleiner dan 9 -->
            <p v-else>Niet in voorraad</p>
            <ul>
                <li v-for="productDetail in productDetails">{{productDetail}}</li> <!--for loop gaat elk item(hier productDetail) in details overlopen, uitlezen en injecteren in li element-->
            </ul>
            <div class="kleurvak d-inline-block mx-2" v-for="(soort, index) in soorten" :key="soort.soortId"
                 @mouseover="updateImageandVoorraad(index)" :style="{background: soort.kleur}" >{{soort.kleur}}</div><!--SHORTHAND v-bind met een key om in de associatieve array binnen te raken NODIG->
            -> objecten worden uitgelezen door de v-for loop VIA CSS BINDING (:style)+ en autom ingevoegd vanuit main bij mouseover: koppelen de image (die hoger in code staat) aan deze code
            SHORTHAND @ => v-on: (click, mouseover, etc)    : => v-bind: -->
           <!-- <div>Aantal({{winkelwagen}})</div> --><!--de ( ) haakjes zijn voor weergave in html GEEN FUNCTIE -->
            <button v-on:click="addToCart" class="btn btn-outline-danger" :disabled="!inVoorraad">koop nu</button><!--eventlistner (wacht op laden pagina en voert in 1x uit), eventhandler (luistert naar elk event apart)
            om te button te beperken tot hoeveelheid in voorraad moet je hem disabelen wnr dat bereikt is-->
            <review-lijst :reviews="reviews"></review-lijst>
        <review-form @toevoegenReview="toevoegenReview"></review-form>

        </div>`,
    data(){
        return{
            product: 'Gsm oplader',
            merk: 'White Label',
            prijs: 50,
            //image:'./images/product.jpg', uitgeschakelt omdat er conflict was (werd eerst gelezen voor computed image )
            //PROPERTY IS HOOGSTE
            beschrijving:'lorem ipsum',
            //inVoorraad: 8, //breekt niet want is = true
            selectedProduct: 0,
            productDetails:["universeel", "smartphone", "1 aansluiting", "inclusief kabel", "inclusief adaptor", "draadloos"],
            soorten:[
                {
                    soortId: 1,  //accolade = 1 item (geschreven zoals json om meerdimensionale arrays te maken)
                    kleur: "black",
                    image: "./images/product.jpg",
                    aantal: 20,
                },
                {
                    soortId: 2,
                    kleur: "green",
                    image: "./images/productgroen.jpg",
                    aantal: 0,
                },
            ],
            reviews: [],
            //winkelwagen: 0,
        }
    },
    methods:{
        addToCart(){
                                                                        //this.winkelwagen +=1;//verwijzen naar hoogste object van de pagina
                                                                        //elke keer je op button klikt gaat winkelwagen met 1 naar boven pagina w binnen zichzelf ververst
                                                                        //onclick event
                                                                        //this.inVoorraad -= 1; vermindert voorraad bij klikken
            this.$emit('toevoegen-winkelwagen', this.soorten[this.selectedProduct].soortId);    //emit is soort event handler voegen we toe idpv this.winkelwagen
            //emit zorgt ervoor dat JE @toevoegen-winkelwagen kan gebruiken in html
            //nu voegen we voor de array te vullen soorte, = alle info van 1 product
                                                     // meegeven met v-on of @ voegt de event hndelr toe aan <poductweergave>
        },
        updateImageandVoorraad(index){ //hier komt index vanuit html binnen maar daarmee komt ook soorten binnen: index = I
            this.selectedProduct = index; //selectedpr begint standaard op 0

        },// onmouseover event
        toevoegenReview(review){
            this.review.push(review)
        }

    },
    computed:{ //gaan rekenen met de data, zorgt voor weegrevn kan je direct meegeven in html in tegenstelling tot methodes
        title(){ //methode staat in computed model want er w combo gemaakt van verschillende properties (bij verbinden ervan of rekenen met verschillende velden)
            //return this.product + ' ' + this.merk; es5 //je kan deze op = manier als een variable ingeven in html {{title}}
            return `${this.product} ${this.merk}`;//es6
        },
        image(){
            return this.soorten[this.selectedProduct].image; //
        },
        inVoorraad(){ //komt van p tag voorraad
            return this.soorten[this.selectedProduct].aantal; //het weergeven van de voorraad gebeurt hier: in selectedProduct zit index 0
        },
        verzendkosten(){
            if(this.member){//if(this.gold==true)
                return 'Gratis verzending'
            } //else
            return 9.99
        }
    }
})
//kracht: herbruikbare krachtige code soort van snippet met code en componenten en functies in
// winkelwagen gaan gberuiken als globale variabele: ww moet uit properties en mmoet globaal worden weergegevn
// in html schrijven en hier in commentaar zetten ook bij data