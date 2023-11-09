import PropTypes from 'prop-types';

const Flag = ({ image, isSelected, ...props }) => (
  <img
    id="flag"
    data-testid="flag"
    alt="flag"
    src={image}
    className={isSelected ? "flag selected" : "flag"}
    {...props}
  />
);

Flag.propTypes = {
  image: PropTypes.string.isRequired,
  isSelected: PropTypes.bool
};

export default Flag;
