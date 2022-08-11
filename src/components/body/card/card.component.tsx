import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import './card.component.scss';
import PokeApiService from '../../../service/poke-api.service';
import DetailCard from '../detail-card/detail-card.component';
import { Pokemon } from '../../../@core/entity/pokemon.entity';
import { useState } from 'react';
import { PokemonDetailMapper } from '../../../@core/usecase/interface/get-pokemon-detail.interface';

const Item = styled(Paper)(() => ({}));

export default function Card(props: {data: Pokemon}) {
  const {data} = props;
  const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false);
  const [pokemonDetailData, setPokemonDetailData] = useState<PokemonDetailMapper>(
    { name: '', types: [], stats: [], moves: [], abilities: [], sprites: {frontDefault: '', frontShiny: ''} }
  );
  const pokeApiService = new PokeApiService();
  const urlImage = (id: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  const openDetail = () => {
    pokeApiService.getPokemonDetail({id: data.id}).then(resp => {
      setOpenDetailDialog(true);
      setPokemonDetailData(resp);
    });

    return true;
  };

  const closeDetail = (val: boolean) => {
    setOpenDetailDialog(!val);
  }

  return (
    <Grid item xs={12} md={4}>
      <div className='card'>
        <Item onClick={openDetail} className="itemTest">
          <img src={urlImage(data.id)} alt="test"/>
          <div className="text-card">{data.name}</div>
        </Item>
      </div>
      <DetailCard isOpen={openDetailDialog} data={pokemonDetailData} setHandleClosed={closeDetail}/>
    </Grid>
  );
}
