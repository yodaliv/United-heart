import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from '@material-ui/core';

const WhiteCard = withStyles({
  root: {
    padding: '8px 14px 16px 14px',
    borderRadius: '9px',
    border: 'solid 1px #eaebec',
  },
})(Card);

const TableCard = withStyles({
  root: {
    padding: '16px 0',
    borderRadius: '9px',
    border: 'solid 1px #eaebec',
  },
})(Card);

const TableCardContent = withStyles({
  root: {
    padding: '0',
  },
})(CardContent);

const CardContainer = withStyles({
  root: {
    borderRadius: 9,
    boxShadow: 'none',
  },
})(Card);

const CardBody = withStyles({
  root: {
    padding: 0,
  },
})(CardContent);

const CardFooter = withStyles({
  root: {
    padding: '0 16px 16px 16px',
  },
})(CardActions);

const NewsCard = ({ text, image, title, description, link }) => {
  return (
    <CardContainer>
      <CardBody>
        <div className="w-full pt-pc-62.75 border border-solid border-gray-200 relative overflow-hidden">
          <img src={image} className="w-full h-full absolute top-0 left-0 object-cover object-top" alt="News logo" />
        </div>
        <div className="m-4">
          <p className="text-1.5xl font-semibold leading-1.33 whitespace-nowrap overflow-ellipsis overflow-hidden">{title}</p>
          <p className="text-sm font-light leading-1.75 min-h-20 max-h-24 overflow-hidden">{description}</p>
        </div>
      </CardBody>
      <CardFooter>
        <a className="font-semibold text-gray-normal leading-1.33 cursor-pointer hover:opacity-80" href={`https://unitedheartsforcanada.com/news/${link}`} target="_blank" rel="noreferrer">{text.readMore}</a>
      </CardFooter>
    </CardContainer>
  );
};

export { WhiteCard, TableCard, TableCardContent, NewsCard };
