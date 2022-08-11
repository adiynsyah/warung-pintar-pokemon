import './filter.component.scss';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from "react";

import { PokemonType } from '../../../@core/entity/pokemon.entity';
import PokeApiService from '../../../service/poke-api.service';

export default function Filter(prop: any) {
  const { selectedType = '' } = prop;
  const pokeApiService = new PokeApiService();

  const [listType, setListType] = useState<PokemonType[]>([]);

  useEffect(() => {
    getPokemonTypeList();
  }, []);

  const getPokemonTypeList = () => {
    pokeApiService.getPokemonTypeList({type: ''}).then(resp => {
      setListType(resp);
    });
  };

  const onChangeFilter = (event: any) => {
    selectedType(event.target.value);
  };

  return (
    <FormControl fullWidth className="filter-wrapper">
      <InputLabel id="demo-simple-select-label">Filter By Type Pokemon</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        onChange={onChangeFilter}
        label="Filter By Type Pokemon"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        { listType.map((dt, index) =>
            <MenuItem key={index} value={dt.name}>{dt.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  )
}