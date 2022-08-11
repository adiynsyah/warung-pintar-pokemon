import "./body.component.scss";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "./card/card.component";
import PokeApiService from "../../service/poke-api.service";
import Filter from "./filter/filter.component";
import { GetPokemonDto } from "../../@core/usecase/interface/get-pokemon.interface";
import { Pokemon } from "../../@core/entity/pokemon.entity";

let getPokemonParams: GetPokemonDto = {
  offset: 0,
  limit: 20
};
let isSelectedFilter = false;

export default function Body() {
  const pokeApiService = new PokeApiService();
  const [pokemons, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = (isInfinitScroll = false) => {

    if (isSelectedFilter) { return; }

    if (isInfinitScroll) { 
      getPokemonParams.offset += 20;
    }
    pokeApiService.getPokemon(getPokemonParams).then(resp => {
      if (isInfinitScroll) {
        let newPokemon = pokemons.concat(resp);
        setPokemon(newPokemon);
      } else {
        setPokemon(resp);
      }
    })
  }

  const handleInfiniteScroll = () => {
    getPokemon(true);
  }

  const onChangeFilter = (value: any) => {

    isSelectedFilter = Boolean(value);

    if (isSelectedFilter) {
      pokeApiService.getPokemonType({type: value}).then(resp => {
        setPokemon(resp);
      });
    } else {
      getPokemon();
    }
  }

  return (
    <Container maxWidth="md">
      <Filter selectedType={onChangeFilter}/>
      <InfiniteScroll
          dataLength={pokemons.length}
          next={handleInfiniteScroll}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
        <Grid container spacing="10">
          { pokemons.map((dt, idx) => 
              <Card key={idx} data={dt}/>
          )}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}
