app.component('review-form',{
    template:
    `<form class="review-form" @submit.prevent="onSubmit" >
    <h3>Laat een review achter</h3>
    <label for="name" class="form-label">Naam:</label>
    <input class="form-control" id="name" v-model="name">
    <label for="review" class="form-label">Review:</label>
    <textarea class="form-control" id="review" v-model="review"></textarea>
    <label class="form-check" for="rating">rating: </label>
    <select id="rating" class="form-select" v-model.number="rating">
        <option> 5</option>
        <option> 4</option>
        <option> 3</option>
        <option> 2</option>
        <option> 1</option>
    </select>
    <input  class="btn btn-primary" type="sumbit" value="submit"> 
 </form>`,
    data(){
        return{
            name: '',
            review: '',
            rating: null //=niks
        }
    },
    methods:{
        onSubmit(){
            let productReview={ //object variabele // name review en rating komen uit v-model
                name: this.name,
                review: this.review,
                rating: this.rating,
            }
            this.$emit('toevoegenReview', productReview), // in productReview zit alles wat de gebruiker heeft ingetypt
            this.name= ' '
            this.review= ''
            this.rating= null
        } //komt bij deze functie na klik en de knop moet meerdere keren gebruikt worden dus velden moeten weer blancp
    }

})
//form verzenden geen type button MAAR TYpE = SUBMIT als je data over browser nr server stuurt
//willen dat er eerst iets tussen gebeurt voor hij data verstuurt-> normale gedraging gaan uitschakelen van de submit soor @submit(methode).prevent
//dus ie zal eerst onSubmit uitvoeren
//v model binding: contactform moet verstuurd worden van A naar B maar moet ook beanntwoord worden: 2 way binding
//