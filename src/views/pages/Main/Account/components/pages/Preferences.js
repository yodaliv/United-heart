import React from 'react';
import { CardActions, CardContent, Divider } from '@material-ui/core';

import { WhiteCard } from '../../../../../../components/Cards';
import { GrayButton } from '../../../../../../components/Buttons';

function Preferences({ text }) {
  return (
    <div className="lg:flex my-12">
      <div className="flex-4">
        <div className="mt-0.5">
          <WhiteCard>
            <CardContent>
              <p className="mb-4 text-2xl font-semibold">{text.desiredBrands}</p>
              <Divider />
              <p className="mt-7.5 leading-1.75 opacity-50">{text.desiredBrandsDescription}</p>
              <div className="xl:flex mt-12.5">
                <div className="flex-7">
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.brands}:</p>
                    </div>
                    <div className="flex-5">
                      <p className="font-medium">Nike</p>
                    </div>
                  </div>
                </div>
                <div className="flex-3" />
              </div>
            </CardContent>
            <CardActions>
              <GrayButton>{text.edit}</GrayButton>
            </CardActions>
          </WhiteCard>
        </div>
      </div>
      <div className="flex-1 lg:block hidden mt-7 ml-12">
      </div>
    </div>
  );
}

export default Preferences;
