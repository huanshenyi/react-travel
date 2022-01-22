// useSelectorに該当プロジェクトの内容を追加
import {useSelector as useReduxSelector, TypedUseSelectorHook} from "react-redux";
import { RootState } from "./store";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
