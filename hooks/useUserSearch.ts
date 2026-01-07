import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useState } from "react";
import { useDebounce } from "./useDebounce";

export function useUserSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const debounceSearchTerm = useDebounce(searchTerm, 300);

    const searchResults = useQuery (
api.users.searchUsers, 
debounceSearchTerm.trim() ? { searchTerm: debounceSearchTerm } : "skip"
    );

    return {
        searchTerm,
        setSearchTerm,
        searchResults: (searchResults || []) as Doc<"users">[],
        isLoading: searchResults === undefined && debounceSearchTerm.trim() !== "",
    };
}
    