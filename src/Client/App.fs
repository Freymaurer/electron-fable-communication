module App

open Elmish
open Elmish.React

open Fable.Core.JsInterop

importSideEffects "./index.css"

#if DEBUG
open Elmish.Debug
open Elmish.HMR
#endif

let arcitect_subscription (eventHandler: (Index.Msg -> unit) -> Index.ARCitect.IEventHandler) (initial: Index.Model) : (SubId * Subscribe<Index.Msg>) list =
    let subscription (dispatch: Index.Msg -> unit) : System.IDisposable =
        let rmv = Index.ARCitect.initEventListener (eventHandler dispatch)
        { new System.IDisposable with
            member _.Dispose() = rmv()
        }
    [ ["arcitect"], subscription ]

let subscription : Index.Model -> Sub<Index.Msg> =
    fun m ->
        arcitect_subscription Index.ARCitectEventHandler m

Program.mkProgram Index.init Index.update Index.view
#if DEBUG
|> Program.withConsoleTrace
#endif
|> Program.withSubscription subscription
|> Program.withReactSynchronous "elmish-app"
#if DEBUG
|> Program.withDebugger
#endif
|> Program.run