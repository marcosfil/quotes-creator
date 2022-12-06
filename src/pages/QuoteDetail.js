import { Fragment, useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

import HighlightedQuote from "../components/quotes/HighlightedQuote";

import LoadingSpinner from "../components/UI/LoadingSpinner";

import Comments from "../components/comments/Comments";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Max", text: "Learning React is fun!" },
//   { id: "q2", author: "Max2", text: "Learning React is bad!" },
//   { id: "q3", author: "Max3", text: "Learning React is great!" },
// ];

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuote.text) {
    return (
      <Fragment>
        <HighlightedQuote text={"No Quote Found!"}></HighlightedQuote>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
