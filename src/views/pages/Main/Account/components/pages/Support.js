import React from 'react';
import { CardContent, Divider } from '@material-ui/core';

import { WhiteCard } from '../../../../../../components/Cards';

function Support({ text }) {
  return (
    <div className="lg:flex my-12">
      <div className="flex-4">
        <div className="mt-0.5">
          <WhiteCard>
            <CardContent>
              <p className="mb-4 text-2xl font-semibold">{text.contactAdmin}</p>
              <Divider />
              <p className="mt-7.5 leading-1.75 opacity-50">{text.contactAdminDescription}:</p>
              <div className="xl:flex mt-12.5">
                <div className="flex-7">
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.name}</p>
                    </div>
                    <div className="flex-5">
                      <p className="font-medium">Felix Sinclair</p>
                    </div>
                  </div>
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.email}</p>
                    </div>
                    <div className="flex-5">
                      <p className="font-medium">felix.sinclair@mail.utoronto.ca</p>
                    </div>
                  </div>
                  <div className="xs:flex items-center my-4">
                    <div className="flex-2">
                      <p className="font-light">{text.phone}</p>
                    </div>
                    <div className="flex-5">
                      <p className="font-medium">555-555-5555</p>
                    </div>
                  </div>
                </div>
                <div className="flex-3" />
              </div>
            </CardContent>
          </WhiteCard>
        </div>
      </div>
      <div className="flex-1 lg:block hidden mt-7 ml-12">
      </div>
    </div>
  );
}

export default Support;
