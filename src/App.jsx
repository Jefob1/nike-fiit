import "./App.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import Cardd from "./components/Card/card";
import Header from "./components/Header/header";
import Cart from "./components/Cart/cart";
import theme from './theme';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'patiCf5az42cTEuMl.341399f2ae73c5e8369a6f60c8a633d0dbe9865c69d48ffe4805c80fff496a44'}).base('appTpBXUcE8MFYHAZ');

function App() {
  const [lanches, setLanches] = useState([]);
  const [lanchesCarrinho, setLanchesCarrinho] = useState([]);
  const [LanchesFiltrados, setLanchesFiltrados] = useState([]);
  const [lanchePesquisado, setLanchePesquisado] = useState("");
  const [pesquisaAtivo, setPesquisaAtivo] = useState(false);

  function adicionarAoCarrinho(produto) {
    setLanchesCarrinho([...lanchesCarrinho, produto]);
  }

  function deletarItemCarrinho(produto) {
    setLanchesCarrinho(lanchesCarrinho.filter((item) => item !== produto));
  }

  function deletarTodositens() {
    setLanchesCarrinho([]);
  }

  function setValorInputParaVazio() {
    setPesquisaAtivo(false);
    setLanchePesquisado("");
  }

  useEffect(() => {
    base('Clothing').select({
      view: 'Closet Gallery',
        fields: ['Product', 'Category', 'Price', 'Picture']
    }).eachPage((records, fetchNextPage) => {
      setLanches(records);
      setLanchesFiltrados(records);
      fetchNextPage();
    },
    (err) => {
      if (err) {
        console.error('Error fetching data:', err);
      }
    }
    )
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header
          lanches={lanches}
          setLanchesFiltrados={setLanchesFiltrados}
          setLanchePesquisado={setLanchePesquisado}
          lanchePesquisado={lanchePesquisado}
          setPesquisaAtivo={setPesquisaAtivo}
        />
<br />
        <main>
          {lanchePesquisado.length !== 0 ? (
            <>
              <h2 className="h2">
                Results for:<p className="p">{lanchePesquisado}</p>
                <br />
                <br />
              </h2>
              <div className=" containerGeral">
                <Cardd
                  adicionarAoCarrinho={adicionarAoCarrinho}
                  LanchesFiltrados={LanchesFiltrados}
                  lanches={lanches}
                  pesquisaAtivo={pesquisaAtivo}
                  lanchePesquisado={lanchePesquisado}
                  setValorInputParaVazio={setValorInputParaVazio}
                />
                <Cart
                  deletarItemCarrinho={deletarItemCarrinho}
                  lanchesCarrinho={lanchesCarrinho}
                  deletarTodositens={deletarTodositens}
                />
              </div>
            </>
          ) : (
            <div className=" containerGeral">
              <Cardd
                adicionarAoCarrinho={adicionarAoCarrinho}
                LanchesFiltrados={LanchesFiltrados}
                lanches={lanches}
                pesquisaAtivo={pesquisaAtivo}
                lanchePesquisado={lanchePesquisado}
                setValorInputParaVazio={setValorInputParaVazio}
              />
              <Cart
                deletarItemCarrinho={deletarItemCarrinho}
                lanchesCarrinho={lanchesCarrinho}
                deletarTodositens={deletarTodositens}
              />
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
