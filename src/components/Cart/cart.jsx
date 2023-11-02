import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart({ deletarItemCarrinho, lanchesCarrinho, deletarTodositens }) {
  let total = lanchesCarrinho.reduce(
    (valorInicial, valoresDosProdutos) =>
      valorInicial + valoresDosProdutos.fields.Price,
    0
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h5" align="center" gutterBottom>
            Cart
          </Typography>
        </Paper>
      </Grid>

      {lanchesCarrinho.length === 0 ? (
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h6" align="center">
              Your cart is empty
            </Typography>
            <Typography variant="body2" align="center">
              Add items
            </Typography>
          </Paper>
        </Grid>
      ) : (
        lanchesCarrinho.map((shoe) => (
          <Grid item xs={12} key={shoe.id}>
            <Paper>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={3}>
                  <img
                    src={shoe.fields.Picture[0]?.url}
                    alt="imagem do produto"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">{shoe.fields.Product}</Typography>
                  <Typography variant="body2">{shoe.fields.Category}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <IconButton
                    aria-label="Remover"
                    onClick={() => deletarItemCarrinho(shoe)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))
      )}

      {lanchesCarrinho.length !== 0 && (
        <>
          <Grid item xs={12}>
            <Paper>
              <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="subtitle1">Total</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">$ {total.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deletarTodositens()}
            >
              Empty Cart
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Cart;
