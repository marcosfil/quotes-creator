import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
  { id: "q1", author: "Max", text: "First you have to learn HTML and CSS" },
  { id: "q2", author: "Max2", text: "Second you have to learn Javascript" },
  { id: "q3", author: "Max3", text: "And learn React is great!" },
];

const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
