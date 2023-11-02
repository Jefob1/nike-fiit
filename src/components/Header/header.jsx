import React, { useState, useEffect } from "react";
import Airtable from 'airtable';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const base = new Airtable({ apiKey: 'patiCf5az42cTEuMl.341399f2ae73c5e8369a6f60c8a633d0dbe9865c69d48ffe4805c80fff496a44' })
.base('appTpBXUcE8MFYHAZ');

const NikeLogo = ({ src, alt }) => (
  <img src={src} alt={alt} style={{ width: '100px' }} />
);

function Header({ setLanchesFiltrados, setLanchePesquisado }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    base('Clothing').select({
      fields: ['Category'],
    }).firstPage((err, records) => {
      if (err) {
        console.error('Error fetching categories:', err);
        return;
      }
      const uniqueCategories = Array.from(new Set(records.map(record => record.fields.Category)));
      setCategories(uniqueCategories);
    });
  }, []);

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    if (Array.isArray(selectedValue)) {
      filterByCategory(selectedValue[0]);
    } else {
      filterByCategory(selectedValue);
    }
  };
  

  const filterByCategory = (category) => {
    setLanchePesquisado('');
  
    if (Array.isArray(category)) {
      const sanitizedCategories = category.map(cat => cat.replace(/'/g, "\\'"));
      const filterFormula = `OR(${sanitizedCategories.map(cat => `REGEX_MATCH({Category}, '${cat}')`).join(',')})`;
  
      base('Clothing').select({
        fields: ['Product', 'Category', 'Price', 'Picture'],
        filterByFormula: filterFormula,
      }).firstPage((err, records) => {
        if (err) {
          console.error('Error fetching filtered data:', err);
          return;
        }
        setLanchesFiltrados(records);
      });
    } else {
   const sanitizedCategory = category.replace(/'/g, "\\'");
      const filterFormula = `REGEX_MATCH({Category}, '${sanitizedCategory}')`;
  
      base('Clothing').select({
        fields: ['Product', 'Category', 'Price', 'Picture'],
        filterByFormula: filterFormula,
      }).firstPage((err, records) => {
        if (err) {
          console.error('Error fetching filtered data:', err);
          return;
        }
        setLanchesFiltrados(records);
      });
    }
  };
  
  function dadosImput(event) {
    setSelectedCategory('');
    setLanchePesquisado(event.target.value);

    const sanitizedSearchTerm = event.target.value.replace(/'/g, "\\'");
    const filterFormula = `OR(REGEX_MATCH({Product}, '${sanitizedSearchTerm}'), REGEX_MATCH({Category}, '${sanitizedSearchTerm}'))`;

    base('Clothing').select({
      fields: ['Product', 'Category', 'Price', 'Picture'],
      filterByFormula: filterFormula,
    }).firstPage((err, records) => {
      if (err) {
        console.error('Error fetching filtered data:', err);
        return;
      }
      setLanchesFiltrados(records);
    });
  }

  function naoCarregarAPagina(event) {
    event.preventDefault();
  }

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <NikeLogo
          src="https://www.transparentpng.com/thumb/nike-logo/Blc12i-red-nike-logo-clipart-png-photos.png"
          alt="Nike Logo"
        />
      </Grid>
      <Grid item>
        <form style={{ margin: '0 10px' }}>
          <TextField
            type="text"
            placeholder="Search products"
            onChange={dadosImput}
          />
          <FormControl sx={{ minWidth: 120, marginLeft: '10px' }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button style={{ margin: '0 10px' }} variant="contained" onClick={(e) => naoCarregarAPagina(e)}>
            Search
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default Header;
