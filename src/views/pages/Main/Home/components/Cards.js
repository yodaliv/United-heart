import Carousel from 'react-material-ui-carousel'
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from '@material-ui/core';

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

const NewsCard = ({ text, image, title, description, link }) => {
  return (
    <CardContainer>
      <CardBody>
        <div className="w-full pt-pc-62.75 rounded-9 border border-solid border-gray-200 relative overflow-hidden">
          <img src={image} className="w-full h-full absolute top-0 left-0 object-cover object-top" alt="News logo" />
        </div>
        <p className="mt-2 text-1.5xl font-semibold  leading-1.33 whitespace-nowrap overflow-ellipsis overflow-hidden">{title}</p>
        <p className="text-sm font-light leading-1.75 max-h-24 overflow-hidden">{description}</p>
      </CardBody>
      <CardFooter>
        <a className="lg:mt-6 mt-4 font-semibold text-gray-normal leading-1.33 cursor-pointer hover:opacity-80" href={`https://unitedheartsforcanada.com/news/${link}`} target="_blank" rel="noreferrer">{text.readMore}</a>
      </CardFooter>
    </CardContainer>
  )
};

const DonationCard = ({ text, images, name, date, onClick }) => {
  return (
    <CardContainer>
      <CardBody>
        {onClick ? (
          <div className="w-full pt-full border border-solid border-gray-200 relative cursor-pointer" onClick={onClick}>
            <ImageCarousel autoPlay={false} indicators={false}>
              {images.map((item, i) => <img key={`donation-card-logo-${i}`} className="w-full h-full object-cover object-top" src={item} alt="Donation logo" />)}
            </ImageCarousel>
          </div>
        ) : (
          <div className="w-full pt-full border border-solid border-gray-200 relative">
            <ImageCarousel autoPlay={false} indicators={false}>
              {images.map((item, i) => <img key={`donation-card-logo-${i}`} className="w-full h-full object-cover object-top" src={item} alt="Donation logo" />)}
            </ImageCarousel>
          </div>
        )}
        <p className="mt-2 text-1.5xl font-semibold  leading-1.33 whitespace-nowrap overflow-ellipsis overflow-hidden">{name}</p>
        <p className="text-sm font-light leading-1.75">{text.date}: {date}</p>
      </CardBody>
    </CardContainer>
  )
};

export { NewsCard, DonationCard };
