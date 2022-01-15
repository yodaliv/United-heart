import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CardActions, CardContent, Divider, Select } from '@material-ui/core';

import { WhiteCard } from '../../../../../../components/Cards';
import { TextInput, SelectInput } from '../../../../../../components/Inputs';
import { BlueButton, GrayButton, BlueOutlineButton, GrayOutlineButton, RedButton } from '../../../../../../components/Buttons';
import CustomCheckbox from '../../../../../../components/CustomCheckbox';
import { SectionTabs } from '../../../../../../components/Tabs';

import { getStatusSIN, applySIN, getStatusAmbassador, applyAmbassador } from '../../../../../../apis/apply';
import { getDateString } from '../../../../../../utils';
import { useAppContext } from '../../../../../../context/AppContext';

function Apply({ text }) {
  const { setLoading, setMessage } = useAppContext();
  const sections = [
    { title: text.requestProducts, href: 'request-products' },
    { title: text.becomeAmbassador, href: 'become-ambassador' },
  ];

  const [sinData, setSinData] = useState(null);
  const [ambassadorData, setAmbassadorData] = useState(null);

  const loadStatusAmbassador = useCallback(() => {
    setLoading(true);
    getStatusAmbassador().then(res => {
      setAmbassadorData(res);
      setLoading(false);
    }).catch(err => {
      if (err?.response?.data?.detail?.error_code === 5010502) {
        setAmbassadorData({
          student_id: '',
          year: 2021,
        });
      } else if (err?.response?.data?.detail?.error_code === 5010400) {
        setAmbassadorData(null);
      } else {
        setAmbassadorData(null);
        setMessage({ open: true, title: text.error, description: text.failedLoadAccountInfo });
      }

      setLoading(false);
    });
  }, [text, setLoading, setMessage]);

  const loadStatusSIN = useCallback(() => {
    setLoading(true);
    getStatusSIN().then(res => {
      setSinData(res);
      loadStatusAmbassador();
    }).catch(err => {
      if (err?.response?.data?.detail?.error_code === 5010302) {
        setSinData({
          social_assistance: false,
          social_insurance_id: '',
          student_id: '',
          dependencies: 0,
        });
        loadStatusAmbassador();
      } else if (err?.response?.data?.detail?.error_code === 5010400) {
        setSinData(null);
      }  else {
        setSinData(null);
        setMessage({ open: true, title: text.error, description: text.failedLoadAccountInfo });
      }

      setLoading(false);
    });
  }, [text, loadStatusAmbassador, setLoading, setMessage]);

  useEffect(() => {
    loadStatusSIN();
  }, [loadStatusSIN]);

  const handleChange = (type, name, value) => {
    if (type === 'request') {
      setSinData({ ...sinData, [name]: value });
    } else {
      setAmbassadorData({ ...ambassadorData, [name]: value });
    }
  };

  const onSubmit = (type) => {
    if (type === 'request') {
      applySIN(sinData).then(res => {
        setSinData(res);
        setLoading(false);
      }).catch(err => {
        setLoading(false);
        setMessage({ open: true, title: text.error, description: text.failedApplySIN });
      });
    } else {
      applyAmbassador(ambassadorData).then(res => {
        setAmbassadorData(res);
        setLoading(false);
      }).catch(err => {
        setLoading(false);
        setMessage({ open: true, title: text.error, description: text.failedApplyAmbassador });
      });
    }
  };

  return (
    <div className="lg:flex my-12">
      <div className="flex-4">
        {sinData && (
          <div id="request-products" className="mt-0.5">
            {sinData.status === 'PENDING' ? (
              <WhiteCard>
                <CardContent>
                  <p className="mb-4 text-2xl font-semibold">{text.requestProducts}</p>
                  <Divider />
                  <div className="xl:flex mt-7.5">
                    <div className="flex-7">
                      <p className="text-gray-normal leading-1.75">{text.pendingRequestProducts}</p>
                      <div className="xs:flex items-center mt-12.5 my-4">
                        <div className="flex-2">
                          <p className="font-light">{text.status}:</p>
                        </div>
                        <div className="flex-5">
                          <p className="w-fit-content bg-yellow-cornsilk text-yellow-broom rounded-6 text-center py-px px-2.5">{text.pending}</p>
                        </div>
                      </div>
                      <div className="xs:flex items-center my-4">
                        <div className="flex-2">
                          <p className="font-light">{text.submitted}:</p>
                        </div>
                        <div className="flex-5">
                          <p className="font-medium">{getDateString(sinData.created_at)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-3" />
                  </div>
                </CardContent>
                <CardActions>
                  <GrayButton>{text.cancel}</GrayButton>
                </CardActions>
              </WhiteCard>
            ) : sinData.status === 'APPROVED' ? (
              <WhiteCard>
                <CardContent>
                  <p className="mb-4 text-2xl font-semibold">{text.requestProducts}</p>
                  <Divider />
                  <div className="xl:flex mt-7.5">
                    <div className="flex-7">
                      <p className="text-gray-normal leading-1.75">{text.successedRequestProducts}</p>
                      <div className="xs:flex items-center mt-12.5 my-4">
                        <div className="flex-2">
                          <p className="font-light">{text.status}:</p>
                        </div>
                        <div className="flex-5">
                          <p className="w-fit-content bg-green-honeydew text-green-lime rounded-6 text-center py-px px-2.5">{text.approved}</p>
                        </div>
                      </div>
                      <div className="xs:flex items-center my-4">
                        <div className="flex-2">
                          <p className="font-light">{text.expires}:</p>
                        </div>
                        <div className="flex-5">
                          <p className="font-medium">March 26, 2021</p>
                        </div>
                      </div>
                      <div className="flex-3" />
                    </div>
                    <div className="flex-3" />
                  </div>
                </CardContent>
                <CardActions>
                  <RedButton>{text.cancel}</RedButton>
                </CardActions>
              </WhiteCard>
            ) : sinData.status === 'DECLINED' ? (
              <WhiteCard>
                <CardContent>
                  <p className="mb-4 text-2xl font-semibold">{text.requestProducts}</p>
                  <Divider />
                  <div className="xl:flex mt-7.5">
                    <div className="flex-7">
                      <p className="text-gray-normal leading-1.75">{text.successedRequestProducts}</p>
                      <div className="xs:flex items-center mt-12.5 my-4">
                        <div className="flex-2">
                          <p className="font-light">{text.status}:</p>
                        </div>
                        <div className="flex-5">
                          <p className="w-fit-content bg-red-misty-rose text-red-strong rounded-6 text-center py-px px-2.5">{text.declined}</p>
                        </div>
                      </div>
                      <div className="xs:flex items-center my-4">
                        <div className="flex-2">
                          <p className="font-light">{text.declined}:</p>
                        </div>
                        <div className="flex-5">
                          <p className="font-medium">{getDateString(sinData.updated_at)}</p>
                        </div>
                      </div>
                      <div className="flex-3" />
                    </div>
                    <div className="flex-3" />
                  </div>
                </CardContent>
              </WhiteCard>
            ) : (
              <WhiteCard>
                <CardContent>
                  <p className="mb-4 text-2xl font-semibold">{text.requestProducts}</p>
                  <Divider />
                  <div className="xl:flex mt-7.5">
                    <div className="flex-7">
                      <p className="text-gray-normal leading-1.75">{text.noRequestProducts}</p>
                      {Boolean(sinData.isEdit) && (
                        <>
                          <div className="mt-12.5 my-4">
                            <div className="xs:flex items-center">
                              <div className="flex-2">
                                <p className="font-light">{text.socialAssistance}:</p>
                              </div>
                              <div className="flex-5">
                                {sinData.social_assistance ? (
                                  <div className="flex">
                                    <div>
                                      <BlueOutlineButton small onClick={() => handleChange('request', 'social_assistance', true)}>{text.yes}</BlueOutlineButton>
                                    </div>
                                    <div className="ml-2">
                                      <GrayOutlineButton small onClick={() => handleChange('request', 'social_assistance', false)}>{text.no}</GrayOutlineButton>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex">
                                    <div>
                                      <GrayOutlineButton small onClick={() => handleChange('request', 'social_assistance', true)}>{text.yes}</GrayOutlineButton>
                                    </div>
                                    <div className="ml-2">
                                      <BlueOutlineButton small onClick={() => handleChange('request', 'social_assistance', false)}>{text.no}</BlueOutlineButton>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="xs:flex items-center">
                              <div className="flex-2" />
                              <div className="flex-5">
                                <p className="pt-1 text-xs text-gray-normal leading-loose">{text.indicateSocialAssistance}</p>
                              </div>
                            </div>
                          </div>
                          <div className="xs:flex items-center my-4">
                            <div className="flex-2">
                              <p className="font-light">{text.socialInsurance} #:</p>
                            </div>
                            <div className="flex-5">
                              <TextInput value={sinData.social_insurance_id} onChange={e => handleChange('request', 'social_insurance_id', e.target.value)} />
                            </div>
                          </div>
                          <div className="my-4">
                            <div className="xs:flex items-center">
                              <div className="flex-2">
                                <p className="font-light">{text.student} #:</p>
                              </div>
                              <div className="flex-5">
                                <TextInput value={sinData.student_id} onChange={e => handleChange('request', 'student_id', e.target.value)} />
                              </div>
                            </div>
                            <div className="xs:flex items-center">
                              <div className="flex-2" />
                              <div className="flex-5">
                                <p className="pt-1 text-xs text-gray-normal leading-loose">{text.studentDescription}</p>
                              </div>
                            </div>
                          </div>
                          <div className="my-4">
                            <div className="xs:flex items-center">
                              <div className="flex-2">
                                <p className="font-light">{text.dependents}:</p>
                              </div>
                              <div className="flex-5">
                                <Select
                                  native
                                  value={sinData.dependencies}
                                  onChange={e => handleChange('request', 'dependencies', parseInt(e.target.value))}
                                  input={<SelectInput />}
                                >
                                  <option value={1}>{text.one}</option>
                                  <option value={2}>{text.two}</option>
                                  <option value={3}>{text.three}</option>
                                  <option value={4}>{text.four}</option>
                                  <option value={5}>{text.five}</option>
                                </Select>
                              </div>
                            </div>
                            <div className="xs:flex items-center">
                              <div className="flex-2" />
                              <div className="flex-5">
                                <p className="pt-1 text-xs text-gray-normal leading-loose">{text.indicateHowMany}</p>
                              </div>
                            </div>
                          </div>
                          <div className="xs:flex items-center my-4">
                            <div className="flex-2" />
                            <div className="flex-5">
                              <CustomCheckbox
                                checked={Boolean(sinData.agree)}
                                onChange={e => handleChange('request', 'agree', e.target.checked)}
                              />
                              <span className="ml-2 text-gray-normal leading-loose">{text.agreeDescription1} <Link className="underline" to="/terms">{text.terms}</Link> {text.agreeDescription2} <Link className="underline" to="/privacy">{text.privacy}</Link>.</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex-3" />
                  </div>
                </CardContent>
                <CardActions>
                  {Boolean(sinData.isEdit) ? (
                    <div className="w-full xl:flex">
                      <div className="flex-7 flex justify-between">
                        <GrayButton onClick={() => setSinData(prevState => ({ ...prevState, isEdit: false }))}>{text.cancel}</GrayButton>
                        <BlueButton disabled={!Boolean(sinData.agree)} onClick={() => onSubmit('request')}>{text.submit}</BlueButton>
                      </div>
                      <div className="flex-3" />
                    </div>
                  ) : (
                    <GrayButton onClick={() => setSinData(prevState => ({ ...prevState, isEdit: true }))}>{text.openApplication}</GrayButton>
                  )}
                </CardActions>
              </WhiteCard>
            )}
          </div>
        )}
        {ambassadorData && (
          <div id="become-ambassador" className="mt-5">
            {ambassadorData.status === 'PENDING' ? (
              <WhiteCard>
                <CardContent>
                  <p className="mb-4 text-2xl font-semibold">{text.becomeAmbassador}</p>
                  <Divider />
                  <div className="xl:flex mt-7.5">
                    <div className="flex-7">
                      <p className="text-gray-normal leading-1.75">{text.pendingBecomeAmbassador}</p>
                      <div className="xs:flex items-center mt-12.5 my-4">
                        <div className="flex-2">
                          <p className="font-light">{text.status}:</p>
                        </div>
                        <div className="flex-5">
                          <p className="w-fit-content bg-yellow-cornsilk text-yellow-broom rounded-6 text-center py-px px-2.5">{text.pending}</p>
                        </div>
                      </div>
                      <div className="xs:flex items-center my-4">
                        <div className="flex-2">
                          <p className="font-light">{text.submitted}:</p>
                        </div>
                        <div className="flex-5">
                          <p className="font-medium">{getDateString(ambassadorData.created_at)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-3" />
                  </div>
                </CardContent>
                <CardActions>
                  <GrayButton>{text.cancel}</GrayButton>
                </CardActions>
              </WhiteCard>
            ) : ambassadorData.status === 'APPROVED' ? (
              <WhiteCard>
                <CardContent>
                  <p className="mb-4 text-2xl font-semibold">{text.becomeAmbassador}</p>
                  <Divider />
                  <div className="xl:flex mt-7.5">
                    <div className="flex-7">
                      <p className="text-gray-normal leading-1.75">{text.successedBecomeAmbassador}</p>
                      <div className="xs:flex items-center mt-12.5 my-4">
                        <div className="flex-2">
                          <p className="font-light">{text.status}:</p>
                        </div>
                        <div className="flex-5">
                          <p className="w-fit-content bg-green-honeydew text-green-lime rounded-6 text-center py-px px-2.5">{text.approved}</p>
                        </div>
                      </div>
                      <div className="xs:flex items-center my-4">
                        <div className="flex-2">
                          <p className="font-light">{text.expires}:</p>
                        </div>
                        <div className="flex-5">
                          <p className="font-medium">March 26, 2021</p>
                        </div>
                      </div>
                      <div className="flex-3" />
                    </div>
                    <div className="flex-3" />
                  </div>
                </CardContent>
                <CardActions>
                  <RedButton>{text.cancel}</RedButton>
                </CardActions>
              </WhiteCard>
            ) : ambassadorData.status === 'DECLINED' ? (
              <WhiteCard>
                <CardContent>
                  <p className="mb-4 text-2xl font-semibold">{text.becomeAmbassador}</p>
                  <Divider />
                  <div className="xl:flex mt-7.5">
                    <div className="flex-7">
                      <p className="text-gray-normal leading-1.75">{text.successedBecomeAmbassador}</p>
                      <div className="xs:flex items-center mt-12.5 my-4">
                        <div className="flex-2">
                          <p className="font-light">{text.status}:</p>
                        </div>
                        <div className="flex-5">
                          <p className="w-fit-content bg-red-misty-rose text-red-strong rounded-6 text-center py-px px-2.5">{text.declined}</p>
                        </div>
                      </div>
                      <div className="xs:flex items-center my-4">
                        <div className="flex-2">
                          <p className="font-light">{text.declined}:</p>
                        </div>
                        <div className="flex-5">
                          <p className="font-medium">{getDateString(ambassadorData.updated_at)}</p>
                        </div>
                      </div>
                      <div className="flex-3" />
                    </div>
                    <div className="flex-3" />
                  </div>
                </CardContent>
              </WhiteCard>
            ) : (
              <WhiteCard>
                <CardContent>
                  <p className="mb-4 text-2xl font-semibold">{text.becomeAmbassador}</p>
                  <Divider />
                  <div className="xl:flex mt-7.5">
                    <div className="flex-7">
                      <p className="text-gray-normal leading-1.75">{text.noBecomeAmbassador}</p>
                      {Boolean(ambassadorData.isEdit) && (
                        <>
                          <div className="mt-12.5 my-4">
                            <div className="xs:flex items-center">
                              <div className="flex-2">
                                <p className="font-light">{text.student} #:</p>
                              </div>
                              <div className="flex-5">
                                <TextInput value={ambassadorData.student_id} onChange={e => handleChange('ambassador', 'student_id', e.target.value)} />
                              </div>
                            </div>
                            <div className="xs:flex items-center">
                              <div className="flex-2" />
                              <div className="flex-5">
                                <p className="pt-1 text-xs text-gray-normal leading-loose">{text.studentDescription}</p>
                              </div>
                            </div>
                          </div>
                          <div className="my-4">
                            <div className="xs:flex items-center">
                              <div className="flex-2">
                                <p className="font-light">{text.year}:</p>
                              </div>
                              <div className="flex-5">
                                <Select
                                  native
                                  value={ambassadorData.year}
                                  onChange={e => handleChange('ambassador', 'year', parseInt(e.target.value))}
                                  input={<SelectInput />}
                                >
                                  <option value={2015}>2015</option>
                                  <option value={2016}>2016</option>
                                  <option value={2017}>2017</option>
                                  <option value={2018}>2018</option>
                                  <option value={2019}>2019</option>
                                  <option value={2020}>2020</option>
                                  <option value={2021}>2021</option>
                                  <option value={2022}>2022</option>
                                  <option value={2023}>2023</option>
                                  <option value={2024}>2024</option>
                                  <option value={2025}>2025</option>
                                </Select>
                              </div>
                            </div>
                            <div className="xs:flex items-center">
                              <div className="flex-2" />
                              <div className="flex-5">
                                <p className="pt-1 text-xs text-gray-normal leading-loose">{text.noAvailableRole}</p>
                              </div>
                            </div>
                          </div>
                          <div className="xs:flex items-center my-4">
                            <div className="flex-2" />
                            <div className="flex-5">
                              <CustomCheckbox
                                checked={Boolean(ambassadorData.agree)}
                                onChange={e => handleChange('ambassador', 'agree', e.target.checked)}
                              />
                              <span className="ml-2 text-gray-normal leading-loose">{text.agreeDescription1} <Link className="underline" to="/terms">{text.terms}</Link> {text.agreeDescription2} <Link className="underline" to="/privacy">{text.privacy}</Link>.</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex-3" />
                  </div>
                </CardContent>
                <CardActions>
                  {Boolean(ambassadorData.isEdit) ? (
                    <div className="w-full xl:flex">
                      <div className="flex-7 flex justify-between">
                        <GrayButton onClick={() => setAmbassadorData(prevState => ({ ...prevState, isEdit: false }))}>{text.cancel}</GrayButton>
                        <BlueButton disabled={!Boolean(ambassadorData.agree)} onClick={() => onSubmit('ambassador')}>{text.submit}</BlueButton>
                      </div>
                      <div className="flex-3" />
                    </div>
                  ) : (
                    <GrayButton onClick={() => setAmbassadorData(prevState => ({ ...prevState, isEdit: true }))}>{text.openApplication}</GrayButton>
                  )}
                </CardActions>
              </WhiteCard>
            )}
          </div>
        )}
      </div>
      <div className="flex-1 lg:block hidden mt-7 ml-12">
        {Boolean(sinData) && Boolean(ambassadorData) && (
          <SectionTabs tabs={sections} />
        )}
      </div>
    </div >
  );
}

export default Apply;
