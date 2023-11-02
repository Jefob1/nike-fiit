import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

export default function Cardd({
  adicionarAoCarrinho,
  LanchesFiltrados,
  lanchePesquisado,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalItems = LanchesFiltrados.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = LanchesFiltrados.slice(startIndex, endIndex);

  return (
    <div>
      <Card sx={{maxWidth: 345}}>
        {currentItems.map((shoe) => (
          <CardContent key={shoe.id}>
            <CardMedia sx={{height: 140}}>
              <img src={shoe.fields.Picture[0]?.url} 
                  alt="imagem"
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
            </CardMedia>
            <div>
              <Typography gutterBottom variant="h5" component="div">
                {shoe.fields.Product}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <span>{shoe.fields.Category && shoe.fields.Category.join(", ")}</span>
                <div>$ {shoe.fields.Price}</div>
              </Typography>
            </div>
            <CardActions>
              <Button onClick={() => adicionarAoCarrinho(shoe)}>
                Add to Cart
              </Button>
            </CardActions>
          </CardContent>
        ))}
      </Card>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}
