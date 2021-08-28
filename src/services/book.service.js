import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/items/";
/*

const getCountOfAllBooks=()=>{
    return axios.get(API_URL + "books/count", { headers: authHeader() });
};

const getBookDetails=(isbn)=>{
    return axios.get(API_URL + "book/" + isbn , { headers: authHeader() });
};

const getSearchBookByTitle=(title)=>{
    return axios.get(API_URL + "search/"+ title , { headers: authHeader() });
};

const getBookList=()=>{
    return axios.get(API_URL + "books", { headers: authHeader() });
};

const postAddBook=(isbn,title,author,publisher,copiesAvi,coverPage)=>{
    return axios.post(
      API_URL + "addBook",
      {
        isbn,
        title,
        author,
        publisher,
        copiesAvi,
        coverPage,
      },
      { headers: authHeader() }
    );
};

const putUpdateBook = (
  isbn,
  title,
  author,
  publisher,
  copiesAvi,
  coverPage
) => {
  return axios.put(
    API_URL + "updateBook",
    {
      isbn,
      title,
      author,
      publisher,
      copiesAvi,
      coverPage,
    },
    { headers: authHeader() }
  );
};

const deleteBookDetails=(isbn)=>{
    return axios.delete(
      API_URL + "deleteBook/"
      + isbn ,
      { headers: authHeader() }
    );
};

export default {
  getCountOfAllBooks,
  getBookDetails,
  getSearchBookByTitle,
  getBookList,
  postAddBook,
  putUpdateBook,
  deleteBookDetails,
};
*/


class BookService {
  deleteBookDetails = (isbn) => {
    return axios.delete(API_URL + "deleteBook/" + isbn, {
      headers: authHeader(),
    });
  };
  getCountOfAllBooks = () => {
    return axios.get(API_URL + "books/count", { headers: authHeader() });
  };

  viewBookDetails = (isbn) => {
    return axios.get(API_URL + "book/" + isbn, { headers: authHeader() });
  };

  getSearchBookByTitle = (title) => {
    return axios.get(API_URL + "search/" + title, { headers: authHeader() });
  };

  getBookList = () => {
    return axios.get(API_URL + "books", { headers: authHeader() });
  };
  /*
 postAddBook=(isbn,title,author,publisher,copiesAvi,coverPage)=>{
    return axios.post(
      API_URL + "addBook",
      {
        isbn,
        title,
        author,
        publisher,
        copiesAvi,
        coverPage,
      },
      { headers: authHeader() }
    );
};*/

  /* putUpdateBook = (isbn, title, author, publisher, copiesAvi, coverPage) => {
    return axios.put(
      API_URL + "updateBook",
      {
        isbn,
        title,
        author,
        publisher,
        copiesAvi,
        coverPage,
      },
      { headers: authHeader() }
    );
  };
}*/

  postAddBook = (book) => {
    return axios.post(API_URL + "addBook",  book , { headers: authHeader() });
  };
  putUpdateBook = (book, isbn)=> {
    return axios.put(API_URL + "update/"+isbn, book, {headers: authHeader()});
  };
}
export default new BookService();