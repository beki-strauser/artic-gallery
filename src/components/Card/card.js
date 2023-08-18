import React from 'react';

import './card.scss';

const Card = (props) => { // Cards Template

    // Check if there's an image or document to show
    let image = null;    

    if(props.image_id !== null && props.image_id !== undefined  ){
        image = "https://www.artic.edu/iiif/2/" + props.image_id + "/full/200,/0/default.jpg";
    }
    else if(props.document_ids[0] !== null && props.document_ids[0] !== undefined ){
        image = "https://www.artic.edu/iiif/2/" + props.document_ids[0] + "/full/200,/0/default.jpg";
    }
    if(image === null){
        image = 'https://placehold.co/600x400?text=Image+Currently+Unavailable';
    }

    // Rotate Cards on click or on Enter key press
    const [isRotated, setIsRotated] = React.useState(false);

    const onRotate = () => setIsRotated((rotated) => !rotated);
    const handlePress = (e) => {
        if(e.key === 'Enter') { 
            onRotate()
        }
    }

    return (
        
        <div className={`card col-sm-12 col-md-6 col-lg-4 ${isRotated ? 'rotated' : ''}`} onClick={onRotate} onKeyDown={handlePress} key={props.id} tabIndex="0">
            {/* Front of Card */}
            <div className="card-front" style={{ backgroundImage: "url(" + image + " )"}}>
                <div className="card-title-bar">
                    <h3 className="card-title">{props.title}</h3>
                    <h4 className="author-title"><small>{props.artist_title ? props.artist_title : 'Unknown Artist'}</small></h4>     
                </div>   
            </div>  
            {/* Back of Card */}
            <div className="card-back" style={{ backgroundImage: "url(" + image + " )" }}>
                <div className="card-information">
                    <p>{props.medium_display}</p>
                    <p>{props.date_display} {props.place_of_origin}</p>
                </div>
            </div>     
        </div>
    )   
}

export default Card;