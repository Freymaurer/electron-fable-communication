module Index

open Elmish
open Fable.Remoting.Client
open Shared

type Model = {
    Todos: Todo list;
    Input: string
    IPC_On_Data: int
}

type ElectronData = {
    data: int
}

type Msg =
    | GotTodos of Todo list
    | SetInput of string
    | AddTodo
    | AddedTodo of Todo
    | UpdateIPC_On_Data of ElectronData

let todosApi =
    Remoting.createApi ()
    |> Remoting.withRouteBuilder Route.builder
    |> Remoting.buildProxy<ITodosApi>

open Fable.Core.JsInterop
open Fable.Core.JS

let init () : Model * Cmd<Msg> =
    let model = { Todos = []; Input = ""; IPC_On_Data = 0 }

    let cmd = Cmd.OfAsync.perform todosApi.getTodos () GotTodos

    model, cmd

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =
    match msg with
    | GotTodos todos -> { model with Todos = todos }, Cmd.none
    | SetInput value -> { model with Input = value }, Cmd.none
    | AddTodo ->
        let todo = Todo.create model.Input

        let cmd = Cmd.OfAsync.perform todosApi.addTodo todo AddedTodo

        { model with Input = "" }, cmd
    | AddedTodo todo -> { model with Todos = model.Todos @ [ todo ] }, Cmd.none
    | UpdateIPC_On_Data data ->
        let nextModel = { model with IPC_On_Data = data.data }
        nextModel, Cmd.none

open Feliz
open Feliz.Bulma

let navBrand =
    Bulma.navbarBrand.div [
        Bulma.navbarItem.a [
            prop.href "https://safe-stack.github.io/"
            navbarItem.isActive
            prop.children [
                Html.img [
                    prop.src "/favicon.png"
                    prop.alt "Logo"
                ]
            ]
        ]
    ]

let containerBox (model: Model) (dispatch: Msg -> unit) =
    Bulma.box [
        Bulma.content [
            Html.ol [
                for todo in model.Todos do
                    Html.li [ prop.text todo.Description ]
            ]
        ]
        Bulma.field.div [
            field.isGrouped
            prop.children [
                Bulma.control.p [
                    control.isExpanded
                    prop.children [
                        Bulma.input.text [
                            prop.value model.Input
                            prop.placeholder "What needs to be done?"
                            prop.onChange (fun x -> SetInput x |> dispatch)
                        ]
                    ]
                ]
                Bulma.control.p [
                    Bulma.button.a [
                        color.isPrimary
                        prop.disabled (Todo.isValid model.Input |> not)
                        prop.onClick (fun _ -> dispatch AddTodo)
                        prop.text "Add"
                    ]
                ]
            ]
        ]
    ]

module IPC =

    let inline invoke(ipcServiceName:string, arguments: 'a) : Promise<'b> = Browser.Dom.window?ipc?invoke(ipcServiceName, arguments)

    let invokeType<'b>(ipcServiceName:string, arguments) : Promise<'b> = Browser.Dom.window?ipc?invoke(ipcServiceName, arguments)

    let inline on(ipcServiceName:string, dataHandler: obj -> unit) : unit = Browser.Dom.window?ipc?on(ipcServiceName, dataHandler)

    let inline onType<'b>(ipcServiceName:string, dataHandler: 'b -> unit) : unit =
        Browser.Dom.console.log($"Registered handler for '{ipcServiceName}'")
        Browser.Dom.window?ipc?on(ipcServiceName, dataHandler)


let testBox (model: Model) (dispatch: Msg -> unit) =
    Bulma.box [
        Bulma.button.a [
            prop.text "ipc"
            prop.onClick(fun e ->
                //let x = IPC.invokeType<int>("SomeService_test", 42).``then``(fun x -> Browser.Dom.console.log(x))
                let x = Browser.Dom.window?ipc
                Browser.Dom.console.log(x)
                ()
            )
        ]
        Bulma.button.a [
            prop.text """ipc.invoke!"""
            prop.onClick(fun e ->
                let x = IPC.invokeType<int>("SomeService_test", 42)
                Browser.Dom.console.log(x)
                ()
            )
        ]
        Bulma.button.a [
            prop.text """ipc.invoke...then!"""
            //prop.text """ipc.invoke("SomeService_test", 42).then...console.log!"""
            prop.onClick(fun e ->
                //let x = IPC.invokeType<int>("SomeService_test", 42).``then``(fun x -> Browser.Dom.console.log(x))
                let x = IPC.invokeType<int>("SomeService_test", 42).``then``(fun x -> Browser.Dom.console.log(x))
                Browser.Dom.console.log(x)
                ()
            )
        ]
    ]

let pingpongBox (model: Model) (dispatch: Msg -> unit) =
    Bulma.box [
        // // only for manually registering handler. This should be done via subscription in App.fs
        //Bulma.button.a [
        //    prop.text "register"
        //    prop.onClick(fun e ->
        //        //let x = IPC.invokeType<int>("SomeService_test", 42).``then``(fun x -> Browser.Dom.console.log(x))
        //        let x = IPC.on("some-message-from-server", fun msg -> Browser.Dom.console.log(msg) )
        //        Browser.Dom.console.log(x)
        //        ()
        //    )
        //]
        Bulma.button.a [
            prop.text "pingpong"
            prop.onClick(fun e ->
                //let x = IPC.invokeType<int>("SomeService_test", 42).``then``(fun x -> Browser.Dom.console.log(x))
                let x = IPC.invoke("some-message-from-renderer", 55).``then``(fun x -> Browser.Dom.console.log(x))
                Browser.Dom.console.log(x)
                ()
            )
        ]
    ]

let view (model: Model) (dispatch: Msg -> unit) =
    Bulma.hero [
        hero.isFullHeight
        color.isPrimary
        prop.style [
            style.backgroundSize "cover"
            style.backgroundImageUrl "https://unsplash.it/1200/900?random"
            style.backgroundPosition "no-repeat center center fixed"
        ]
        prop.children [
            Bulma.heroHead [
                Bulma.navbar [
                    Bulma.container [ navBrand ]
                ]
            ]
            Bulma.heroBody [
                Bulma.container [
                    Bulma.column [
                        column.is6
                        column.isOffset3
                        prop.children [
                            Bulma.title [
                                text.hasTextCentered
                                prop.text "electron_test2"
                            ]
                            containerBox model dispatch
                            testBox model dispatch
                            pingpongBox model dispatch
                        ]
                    ]
                ]
            ]
        ]
    ]