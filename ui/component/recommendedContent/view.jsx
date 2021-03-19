// @flow
import { SHOW_ADS, SIMPLE_SITE } from 'config';
import React from 'react';
import ClaimList from 'component/claimList';
import Ads from 'web/component/ads';
import Card from 'component/common/card';
import { useIsMobile, useIsMediumScreen } from 'effects/use-screensize';

type Props = {
  uri: string,
  recommendedContent: Array<string>,
  isSearching: boolean,
  doGetRecommendedContent: (string, boolean) => void,
  mature: boolean,
  isAuthenticated: boolean,
};

export default function RecommendedContent(props: Props) {
  const { uri, doGetRecommendedContent, mature, recommendedContent, isSearching, isAuthenticated } = props;
  const isMobile = useIsMobile();
  const isMedium = useIsMediumScreen();

  React.useEffect(() => {
    doGetRecommendedContent(uri, mature);
  }, [uri, mature]);

  return (
    <Card
      isBodyList
      smallTitle={!isMobile && !isMedium}
      className="file-page__recommended"
      title={__('Related')}
      body={
        <ClaimList
          type="small"
          loading={isSearching}
          uris={recommendedContent}
          hideMenu={isMobile}
          injectedItem={
            SHOW_ADS && IS_WEB ? (
              SIMPLE_SITE ? (
                <Ads small type={'google'} uri={uri} />
              ) : (
                !isAuthenticated && <Ads small type={'video'} />
              )
            ) : (
              false
            )
          }
          empty={__('No related content found')}
        />
      }
    />
  );
}
