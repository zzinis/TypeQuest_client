import React from 'react';
import { useParams } from 'react-router-dom';

const PersonalResult = ({ cardData }) => {
    const { type_id } = useParams();

    const selectedCard = cardData.find((data) => data.type_id === type_id);

    if (!selectedCard) {
        return <div>Invalid Type ID</div>;
    }

    return (
        <div>
            <h2>{selectedCard.type_id}</h2>
            <img src={selectedCard.img} alt={selectedCard.type_id} />
            <p>{selectedCard.content}</p>
        </div>
    );
};

export default PersonalResult;
