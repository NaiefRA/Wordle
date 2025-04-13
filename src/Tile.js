const Tile = ({ letter, state }) => {
  return <div className={"letter " + state}>{letter}</div>;
};

export default Tile;
