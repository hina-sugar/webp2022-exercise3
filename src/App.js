import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
    return (
      <header className="hero is-link is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Cute Dog Images</h1>
            <h2 class="subtitle">
            If you select a dog breed, you can output an image of the dog.
            </h2>
          </div>
          
        </div>
      </header>
    );
  }
  
  function Image(props) {
    return (
          <figure className="image is-1by1">
            <img className="is-rounded" src={props.src} alt="cute dog!"/>
          </figure>
    );
  }

  function Loading() {
    return <p>Loading...</p>;
  }
  
  
  function Gallery(props) {
    const { urls } = props;
    if (urls == null) {
        return <Loading />;
      }
    return (
      <div className="columns is-vcentered is-multiline">
        {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
      </div>
    );
  }
  

  function Form(props) {
    function handleSubmit(event) {
      event.preventDefault();
      const { breed } = event.target.elements;
      props.onFormSubmit(breed.value);
    }
    return (
      <div>
        <p>Please choose a breed of dog!!</p>
        <form onSubmit={handleSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded has-icons-left">
              <div className="select is-fullwidth is-rounded is-focused">
                <select name="breed" defaultValue="appenzeller">
                  <option value="appenzeller">Appenzeller</option>
                  <option value="beagle">Beagle</option>
                  <option value="chihuahua">Chihuahua</option>
                  <option value="dalmatian">Dalmatian</option>
                  <option value="eskimo">Eskimo</option>
                  <option value="retriever">Golden Retriever</option>
                  <option value="husky">Husky</option>
                  <option value="kuvasz">Kuvasz</option>
                  <option value="labrador">Labrador</option>
                  <option value="mix">Mix</option>
                  <option value="otterhound">Otterhound</option>
                  <option value="papillon">Papillon</option>
                  <option value="redbone">Redbone</option>
                  <option value="shiba">Shiba</option>
                  <option value="poodle">Toy Poodle</option>
                  <option value="whippet">Whippet</option>
                  
                  
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-link is-round">
                Reload
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  function Main() {
    const [urls, setUrls] = useState(null);
    useEffect(() => {
        fetchImages("appenzeller").then((urls) => {
            setUrls(urls);
        });
      }, []);
      function reloadImages(breed) {
        fetchImages(breed).then((urls) => {
          setUrls(urls);
        });
      }
    return (
      <main>
        <section className="section">
          <div className="container">
            <Form onFormSubmit={reloadImages} />
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Gallery urls={urls} />
          </div>
        </section>
      </main>
    );
  }
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Dog images are retrieved from Dog API</p>
          <p>
            <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
          </p>
          <p>5420005 佐藤緋奈</p>
          <p>これは日本大学文理学部情報科学科Webプログラミングの演習課題である。</p>
        </div>
      </footer>
    );
  }
  
  function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
  
  export default App;