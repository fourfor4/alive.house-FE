import React from "react";
import useNoAuth from "../../../../hooks/useNoAuth";
import useRouter from "../../../../hooks/useRouter";
import MarketPlaceCard from "../../MarketPlace/components/MarketPlaceCard";

const ArtistSongs = () => {
  const [songs, setSongs] = React.useState(null);
  const { fetchDataByQuery } = useNoAuth();
  const router = useRouter();

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await fetchDataByQuery();

    if (result) {
      // console.log({ result });
      setSongs(result);
    }
  };

  const goToSongPage = (id) => {
    if (id) {
      router.push(`/songpage?id=${id}`);
    }
  };
  return (
    <div>
      <div className="flex flex-wrap gap-[15rem] justify-center my-10">
        {songs?.length &&
          songs.map((song, index) => {
            return (
              <MarketPlaceCard
                status="i"
                key={index}
                data={song}
                func={goToSongPage}
              />
            );
          })}

        {/* <MarketPlaceCard status='i'/>
        <MarketPlaceCard status='c'/>
        <MarketPlaceCard status='n'/>
        <MarketPlaceCard status='i'/>
        <MarketPlaceCard status='c'/>
        <MarketPlaceCard status='n'/> */}
      </div>
    </div>
  );
};

export default ArtistSongs;
