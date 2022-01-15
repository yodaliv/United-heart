import Carousel from 'react-material-ui-carousel'
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

import { ActionButton } from '../../../../../components/Buttons';

const CardContainer = withStyles({
  root: {
    borderRadius: 0,
    boxShadow: 'none'
  },
})(Card);

const CardBody = withStyles({
  root: {
    padding: 0
  },
})(CardContent);

const CardFooter = withStyles({
  root: {
    padding: 0
  },
})(CardActions);

const ImageCarousel = withStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    '& div': {
      height: '100%'
    },
    '& button': {
      outline: 'none'
    }
  },
})(Carousel);

const InventoryCard = ({ text, images, name, quantity, description, count, onChangeCount }) => {
  return (
    <CardContainer>
      <CardBody>
        <div className="w-full pt-full border border-solid border-gray-200 relative">
          <ImageCarousel autoPlay={false} indicators={false}>
            {images.map((item, i) => <img key={`donation-card-logo-${i}`} className="w-full h-full object-cover object-top" src={item} alt="Donation logo" />)}
          </ImageCarousel>
        </div>
        <div className="max-h-20 overflow-hidden">
          <p className="mt-2 text-1.5xl font-semibold  leading-1.33 whitespace-nowrap overflow-ellipsis overflow-hidden">{name}</p>
          <div className="flex justify-between">
            <p className="text-sm font-light leading-1.75 max-h-24 overflow-hidden">{description}</p>
            <p className="text-sm font-light leading-1.75">{text.qty}: <b>{quantity}</b></p>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div className="w-full flex justify-center items-center md:mt-2">
          <ActionButton onClick={() => onChangeCount('step', -1)} disabled={count === 0}><Remove /></ActionButton>
          <input className="mx-2 p-1 w-1/4 text-center" value={count} onChange={e => onChangeCount('manual', e.target.value)} />
          <ActionButton onClick={() => onChangeCount('step', 1)}><Add /></ActionButton>
        </div>
      </CardFooter>
    </CardContainer>
  )
};

export { InventoryCard };
