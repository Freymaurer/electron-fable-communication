module Server

open Fable.Remoting.Server
open Fable.Remoting.Giraffe
open Saturn

open Shared

module Storage =
    let todos = ResizeArray()

    let addTodo (todo: Todo) =
        if Todo.isValid todo.Description then
            todos.Add todo
            Ok()
        else
            Error "Invalid todo"

    do
        addTodo (Todo.create "Create new SAFE project")
        |> ignore

        addTodo (Todo.create "Write your app") |> ignore
        addTodo (Todo.create "Ship it !!!") |> ignore

let todosApi =
    { getTodos = fun () -> async { return Storage.todos |> List.ofSeq }
      addTodo =
        fun todo ->
            async {
                return
                    match Storage.addTodo todo with
                    | Ok () -> todo
                    | Error e -> failwith e
            } }

let webApp =
    Remoting.createApi ()
    |> Remoting.withRouteBuilder Route.builder
    |> Remoting.fromValue todosApi
    |> Remoting.buildHttpHandler

open Microsoft.AspNetCore.Hosting
open ElectronNET.API.Entities
open Microsoft.AspNetCore.Builder

module Electron =

    open System
    open Saturn
    open ElectronNET.API


    type Saturn.Application.ApplicationBuilder with

        [<CustomOperation("use_electron")>]
        member __.UseElectronNet(state:ApplicationState, alternateUrl:string) =
            // check if is run by the electron cli
            let hasElectronParams =
                state.CliArguments
                |> Option.map (fun args -> args |> Array.exists (fun a -> a.Contains("ELECTRON",StringComparison.InvariantCultureIgnoreCase)))
                |> Option.defaultValue false

            let webHostConfig (cfg:IWebHostBuilder) =
                if hasElectronParams then
                    cfg.UseElectron(Option.toObj state.CliArguments)
                else
                    cfg.UseUrls(alternateUrl)

            {
                state with
                    WebHostConfigs = webHostConfig::state.WebHostConfigs
            }

        [<CustomOperation("run_electron")>]
        member __.RunElectron(state:ApplicationState, windowOptions:BrowserWindowOptions, title:string) =

            let appBuildConfig (app:IApplicationBuilder) =
                let runElectron () =
                    task {
                        try
                            let! browserWindow = Electron.WindowManager.CreateWindowAsync(windowOptions)
                            do! browserWindow.WebContents.Session.ClearCacheAsync()

                            browserWindow.add_OnReadyToShow(fun () ->
                                browserWindow.Show()
                            )

                            browserWindow.SetTitle(title)
                        with
                        | _  as ex ->
                            printfn "%s" ex.Message
                    }

                if HybridSupport.IsElectronActive then
                    runElectron () |> ignore

                app

            {
                state with
                    AppConfigs = appBuildConfig::state.AppConfigs
            }


open Electron
open ElectronNET.API.Entities



[<EntryPoint>]
let main args =
    let app =
        application {
            cli_arguments args
            use_electron ("http://*:8085")
            run_electron (BrowserWindowOptions(Width=1200,Height=940,Show=false)) "fancy safe stack in electron net"
            use_router webApp
            memory_cache
            use_static "www"
            use_gzip
        }
    run app
    0