import { Union, Record } from "./fable_modules/fable-library.3.7.15/Types.js";
import { TodoModule_isValid, TodoModule_create, ITodosApi$reflection, Route_builder, Todo$reflection } from "./Shared/Shared.js";
import { union_type, record_type, string_type, list_type } from "./fable_modules/fable-library.3.7.15/Reflection.js";
import { RemotingModule_createApi, RemotingModule_withRouteBuilder, Remoting_buildProxy_Z15584635 } from "./fable_modules/Fable.Remoting.Client.7.19.0/Remoting.fs.js";
import { cons, ofArray, singleton, append, empty } from "./fable_modules/fable-library.3.7.15/List.js";
import { Cmd_OfAsync_start, Cmd_OfAsyncWith_perform } from "./fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { Cmd_none } from "./fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { createElement } from "react";
import { Interop_reactApi } from "./fable_modules/Feliz.1.64.0/Interop.fs.js";
import { createObj } from "./fable_modules/fable-library.3.7.15/Util.js";
import { Helpers_combineClasses } from "./fable_modules/Feliz.Bulma.2.18.0/ElementBuilders.fs.js";
import { map, delay, toList } from "./fable_modules/fable-library.3.7.15/Seq.js";

export class Model extends Record {
    constructor(Todos, Input) {
        super();
        this.Todos = Todos;
        this.Input = Input;
    }
}

export function Model$reflection() {
    return record_type("Index.Model", [], Model, () => [["Todos", list_type(Todo$reflection())], ["Input", string_type]]);
}

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["GotTodos", "SetInput", "AddTodo", "AddedTodo"];
    }
}

export function Msg$reflection() {
    return union_type("Index.Msg", [], Msg, () => [[["Item", list_type(Todo$reflection())]], [["Item", string_type]], [], [["Item", Todo$reflection()]]]);
}

export const todosApi = Remoting_buildProxy_Z15584635(RemotingModule_withRouteBuilder(Route_builder, RemotingModule_createApi()), {
    ResolveType: ITodosApi$reflection,
});

export function init() {
    const model = new Model(empty(), "");
    const cmd = Cmd_OfAsyncWith_perform((x) => {
        Cmd_OfAsync_start(x);
    }, todosApi.getTodos, void 0, (arg0) => (new Msg(0, arg0)));
    return [model, cmd];
}

export function update(msg, model) {
    switch (msg.tag) {
        case 1: {
            const value = msg.fields[0];
            return [new Model(model.Todos, value), Cmd_none()];
        }
        case 2: {
            const todo = TodoModule_create(model.Input);
            const cmd = Cmd_OfAsyncWith_perform((x) => {
                Cmd_OfAsync_start(x);
            }, todosApi.addTodo, todo, (arg0) => (new Msg(3, arg0)));
            return [new Model(model.Todos, ""), cmd];
        }
        case 3: {
            const todo_1 = msg.fields[0];
            return [new Model(append(model.Todos, singleton(todo_1)), model.Input), Cmd_none()];
        }
        default: {
            const todos = msg.fields[0];
            return [new Model(todos, model.Input), Cmd_none()];
        }
    }
}

export const navBrand = (() => {
    let props_1, elems;
    const elms = singleton((props_1 = ofArray([["href", "https://safe-stack.github.io/"], ["className", "is-active"], (elems = [createElement("img", {
        src: "/favicon.png",
        alt: "Logo",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]), createElement("a", createObj(Helpers_combineClasses("navbar-item", props_1)))));
    return createElement("div", {
        className: "navbar-brand",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    });
})();

export function containerBox(model, dispatch) {
    let elms, children, props_10, elems_3, props_5, elems_1, elms_1, props_7;
    const elms_2 = ofArray([(elms = singleton((children = toList(delay(() => map((todo) => createElement("li", {
        children: todo.Description,
    }), model.Todos))), createElement("ol", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (props_10 = ofArray([["className", "is-grouped"], (elems_3 = [(props_5 = ofArray([["className", "is-expanded"], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["value", model.Input], ["placeholder", "What needs to be done?"], ["onChange", (ev) => {
        dispatch(new Msg(1, ev.target.value));
    }]])))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]), createElement("p", createObj(Helpers_combineClasses("control", props_5)))), (elms_1 = singleton((props_7 = ofArray([["className", "is-primary"], ["disabled", !TodoModule_isValid(model.Input)], ["onClick", (_arg1) => {
        dispatch(new Msg(2));
    }], ["children", "Add"]]), createElement("a", createObj(Helpers_combineClasses("button", props_7))))), createElement("p", {
        className: "control",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]), createElement("div", createObj(Helpers_combineClasses("field", props_10))))]);
    return createElement("div", {
        className: "box",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    });
}

export function view(model, dispatch) {
    let elems_6, elms_2, elms_1, elms_4, elms_3, props_5, elems_3;
    const props_9 = ofArray([["className", "is-fullheight"], ["className", "is-primary"], ["style", {
        backgroundSize: "cover",
        backgroundImage: "url(\u0027https://unsplash.it/1200/900?random\u0027)",
        backgroundPosition: "no-repeat center center fixed",
    }], (elems_6 = [(elms_2 = singleton((elms_1 = singleton(createElement("div", {
        className: "container",
        children: Interop_reactApi.Children.toArray([navBrand]),
    })), createElement("nav", {
        className: "navbar",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))), createElement("div", {
        className: "hero-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    })), (elms_4 = singleton((elms_3 = singleton((props_5 = ofArray([["className", "is-6"], ["className", "is-offset-3"], (elems_3 = [createElement("h1", createObj(Helpers_combineClasses("title", ofArray([["className", "has-text-centered"], ["children", "New_folder"]])))), containerBox(model, dispatch)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]), createElement("div", createObj(Helpers_combineClasses("column", props_5))))), createElement("div", {
        className: "container",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))), createElement("div", {
        className: "hero-body",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_6))])]);
    return createElement("section", createObj(Helpers_combineClasses("hero", props_9)));
}

//# sourceMappingURL=Index.js.map
