import {
  AssetCollection,
  EventCollection,
  FocusnumberCollection,
  MemberCollection,
  PracticalItemCollection,
  useGetEventsQuery,
  useGetFocusNumbersQuery,
  useGetMembersQuery,
  useGetNewGamesQuery,
  useGetPracticalItemsQuery,
} from 'graphql/schema';
import PageLoader from 'layout/components/pageLoader/pageLoader';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import HomePage from './homePage';
import './styles.scss';

interface Props {}

const HomePageContainer: React.FC<Props> = () => {
  const requestCounter = useSelector((state: any) => state.graphql.requestCounter);
  const [currentDate] = useState<string>(new Date().toISOString());

  const { data: newGamesRequest } = useGetNewGamesQuery();
  const { data: practicalItemsRequest } = useGetPracticalItemsQuery();
  const { data: focusnumberRequest } = useGetFocusNumbersQuery();
  const { data: eventRequest } = useGetEventsQuery({
    variables: { now: currentDate },
  });
  const { data: memberRequest } = useGetMembersQuery();

  if (requestCounter > 0) {
    return <PageLoader />;
  }

  return (
    <>
      {newGamesRequest && practicalItemsRequest && focusnumberRequest && eventRequest && memberRequest && (
        <HomePage
          assetCollection={newGamesRequest.assetCollection as AssetCollection}
          practicalItemCollection={practicalItemsRequest.practicalItemCollection as PracticalItemCollection}
          focusnumberCollection={focusnumberRequest.focusnumberCollection as FocusnumberCollection}
          eventCollection={eventRequest.eventCollection as EventCollection}
          memberCollection={memberRequest.memberCollection as MemberCollection}
        />
      )}
    </>
  );
};

export default HomePageContainer;
