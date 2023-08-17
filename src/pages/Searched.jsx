import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { API_KEY } from '../apikey';

function Searched() {

    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();

    const getSearched = async (name, API_KEY) => {

        const data = await fetch(`
        https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=20&query=${name}
        `);
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
    };

    useEffect(() => {
        getSearched(params.search, API_KEY);
    }, [params.search]);


    return (
        <Grid>
            {
                searchedRecipes.map((item) => {
                    return (
                        <Card key={item.id}>
                             <Link to={'/recipe/' + item.id}>
                            <img src={item.image} alt={item.title} />
                            <h4>{item.title}</h4>
                            </Link>
                        </Card>
                    );
                })}
        </Grid>

    );
};

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
grid-gap: 1rem;
`;

const Card = styled.div`
img{
width 100%;
border-radius: 2rem;
}
a{
    text-decoration: none;
}
h4{
    text-align: center;
    padding: 1rem;
  
}
`;



export default Searched;