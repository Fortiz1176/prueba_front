const PopUpCharacter = ({ data, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMessages = messages.length > 0;

  const content = <></>;
  return content;
};


PopUpCharacter.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  gender: PropTypes.string,
  species: PropTypes.string,
  origin: PropTypes.string,
  location: PropTypes.string,
  image: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  autoClose: PropTypes.bool,
  children: PropTypes.node,
};

export default PopUpCharacter;
