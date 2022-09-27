module App

open Elmish
open Elmish.React

#if DEBUG
open Elmish.Debug
open Elmish.HMR
#endif

module ElectronSubscriptions =
    let SomeMessageFromServer (initial:Index.Model) =
        let sub (dispatch:Index.Msg -> unit) =
            Index.IPC.onType<Index.ElectronData>("some-message-from-server", fun data ->
                Index.UpdateIPC_On_Data data |> dispatch
            )
        Cmd.ofSub sub


Program.mkProgram Index.init Index.update Index.view
#if DEBUG
|> Program.withConsoleTrace
|> Program.withSubscription ElectronSubscriptions.SomeMessageFromServer
#endif
|> Program.withReactSynchronous "elmish-app"
#if DEBUG
|> Program.withDebugger
#endif
|> Program.run