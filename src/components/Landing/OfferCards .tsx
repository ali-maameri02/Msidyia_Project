import "../../index.css";


function OfferCards() {

    return(
        <div className="container mx-auto px-4 py-8 flex flex-col justify-center align-middle cards-container">
            <div className="grid md:grid-cols-2 md:gap-20 sm:grid-cols-1 sm:gap-15">
                <li className=" shadow-x1 cards-li"><div className="cards card1"> 
                    <p className="card-Title">Small groups</p>
                    <p className="card-description">Real-world practice in groups</p>
                    <button className='card-button'>Select</button>
                    <p className="offer-title">STARTING FROM</p>
                    <p className="cards-price">$13<sup>/mo</sup></p>
                    <ul className='cards-listing'>
                        <li>Work with a tutor and 1-2 students</li>
                        <li>Meet learners from around the world</li>
                        <li>Structured discussions for all levels</li>
                        <li>For adults 21+</li>
                </ul>
                </div></li>
                <li className=" shadow-x2  cards-li"><div className="cards card2">
                <p className="card-Title">Private+</p>
                    <p className="card-description">Full access to private and group lessons</p>
                    <button className='card-button'>Select</button>
                    <p className="offer-title">STARTING FROM</p>
                    <p className="cards-price">$34<sup>/mo</sup></p>
                    <ul className='cards-listing'>
                        <li> Our most comprehensive experience</li>
                        <li>Take 100% private lessons or try groups too</li>
                        <li>Rewatch your lesson videos</li>
                        <li> Get personalized exercises between lessons</li>    
                    </ul>
                </div></li>
                
            </div>
        </div>
    )
}


export default OfferCards;