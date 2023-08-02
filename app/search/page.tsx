import getSongsByTitle from "@/actions/getSongsByTitle";
import { SearchContent } from "@/app/search/components/SearchContent";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import { FC } from "react";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const Search: FC<SearchProps> = async (props) => {
  const { searchParams } = props;
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div
      className={
        "bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
      }
    >
      <Header className={"from-bg-neutral-900"}>
        <div className={"mb-2 flex-col gap-y-6"}>
          <h1 className={"text-white text-3xl font-semibold"}>Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;