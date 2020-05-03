export interface AppState{}
export interface IAppState<T>
{
    readonly all: IAppState<T>
}