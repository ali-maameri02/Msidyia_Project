import "../../index.css";

function OfferCards() {
    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
            <div className=" gap-x-12 sm:grid-cols-5 lg:grid-cols md:grid-cols-2 flex flex-row justify-between flex-wrap ">
                {/* Card 1 */}
                <li className="shadow-xl rounded-lg overflow-hidden bg-white p-12 cards-li list-none mb-5">
                    <div className="cards card1 flex flex-col items-center">
                        <p className="card-title text-xl font-bold text-center mb-2">Small Groups</p>
                        <p className="card-description text-center mb-4 text-gray-700">Real-world practice in groups</p>
                        <button className="card-button bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all mb-4">
                            Select
                        </button>
                        <p className="offer-title text-sm uppercase tracking-wide text-gray-500 mb-2">Starting From</p>
                        <p className="cards-price text-3xl font-bold text-gray-800">
                            $13<sup className="text-lg font-medium text-gray-600">/mo</sup>
                        </p>
                        <ul className="cards-listing text-sm text-gray-600 mt-4 space-y-2">
                            <li>Work with a tutor and 1-2 students</li>
                            <li>Meet learners from around the world</li>
                            <li>Structured discussions for all levels</li>
                            <li>For adults 21+</li>
                        </ul>
                    </div>
                </li>

                {/* Card 2 */}
                <li className="shadow-xl rounded-lg overflow-hidden bg-white p-6 cards-li list-none">
                    <div className="cards card2 flex flex-col items-center">
                        <p className="card-title text-xl font-bold text-center mb-2">Private+</p>
                        <p className="card-description text-center mb-4 text-gray-700">Full access to private and group lessons</p>
                        <button className="card-button bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all mb-4">
                            Select
                        </button>
                        <p className="offer-title text-sm uppercase tracking-wide text-gray-500 mb-2">Starting From</p>
                        <p className="cards-price text-3xl font-bold text-gray-800">
                            $34<sup className="text-lg font-medium text-gray-600">/mo</sup>
                        </p>
                        <ul className="cards-listing text-sm text-gray-600 mt-4 space-y-2">
                            <li>Our most comprehensive experience</li>
                            <li>Take 100% private lessons or try groups too</li>
                            <li>Rewatch your lesson videos</li>
                            <li>Get personalized exercises between lessons</li>
                        </ul>
                    </div>
                </li>
            </div>
        </div>
    );
}

export default OfferCards;
