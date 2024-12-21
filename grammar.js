/**
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* This file is automatically created by tree_sitter.py in the CG/SQL
 * project. Manual editing here is not advised.  The generator is
 * located at https://github.com/ricomariani/CG-SQL-author in the
 * scripts/grammar_utils/tree_sitter.py file
 */

module.exports = grammar({
  name: 'cql',
  extras: $ => [
     /\s|\r?\n/,
     $.comment
  ],
  conflicts: $ => [
     [$.fk_options],
  ],
  word: $ => $.ID,
  rules: {

    program: $ => optional($.stmt_list),

    INT_LIT: $ => choice(/[0-9]+/, /0x[0-9a-fA-F]+/),
    LONG_LIT: $ => choice(/[0-9]+L/, /0x[0-9a-fA-F]+L/),
    REAL_LIT: $ => /([0-9]+\.[0-9]*|\.[0-9]+)((E|e)(\+|\-)?[0-9]+)?/,
    BLOB_LIT: $ => /[xX]'([0-9a-fA-F][0-9a-fA-F])*'/,
    C_STR_LIT: $ => /"(\\.|[^"\n])*"/,
    STR_LIT: $ => /'(''|[^'])*'/,
    QID: $ => /`(``|[^`\n])*`/,

    /* no newline between ELSE and IF */
    ELSE_IF: $ => /ELSE[ \t]*IF[ \t\n]/i,

    include_stmt: $ => seq(CI('@include'), $.C_STR_LIT),

    comment: $ => token(choice(
       seq('--', /(\\(.|\r?\n)|[^\\\n])*/),
       seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/'))),

    stmt_list: $ => repeat1(choice($.stmt, $.include_stmt, $.comment)),

    macro_ref: $ => choice(
      seq($.ID, '!'),
      seq($.ID, '!', '(', optional($.macro_args), ')')),

    stmt: $ => choice(
      seq(optional($.misc_attrs), $.any_stmt, ';'),
      $.ifdef_stmt,
      $.ifndef_stmt),

    expr_stmt: $ => $.expr,

    any_stmt: $ => choice(
      $.alter_table_add_column_stmt,
      $.expr_stmt,
      $.begin_schema_region_stmt,
      $.begin_trans_stmt,
      $.call_stmt,
      $.close_stmt,
      $.commit_return_stmt,
      $.commit_trans_stmt,
      $.const_stmt,
      $.continue_stmt,
      $.create_index_stmt,
      $.create_proc_stmt,
      $.create_table_stmt,
      $.create_trigger_stmt,
      $.create_view_stmt,
      $.create_virtual_table_stmt,
      $.declare_deployable_region_stmt,
      $.declare_enum_stmt,
      $.declare_const_stmt,
      $.declare_group_stmt,
      $.declare_func_stmt,
      $.declare_select_func_stmt,
      $.declare_out_call_stmt,
      $.declare_proc_no_check_stmt,
      $.declare_proc_stmt,
      $.declare_interface_stmt,
      $.declare_schema_region_stmt,
      $.declare_vars_stmt,
      $.declare_forward_read_cursor_stmt,
      $.declare_fetched_value_cursor_stmt,
      $.declare_type_stmt,
      $.delete_stmt,
      $.drop_index_stmt,
      $.drop_table_stmt,
      $.drop_trigger_stmt,
      $.drop_view_stmt,
      $.echo_stmt,
      $.emit_enums_stmt,
      $.emit_group_stmt,
      $.emit_constants_stmt,
      $.end_schema_region_stmt,
      $.enforce_normal_stmt,
      $.enforce_pop_stmt,
      $.enforce_push_stmt,
      $.enforce_reset_stmt,
      $.enforce_strict_stmt,
      $.explain_stmt,
      $.select_nothing_stmt,
      $.fetch_call_stmt,
      $.fetch_stmt,
      $.fetch_values_stmt,
      $.guard_stmt,
      $.if_stmt,
      $.insert_stmt,
      $.leave_stmt,
      $.let_stmt,
      $.loop_stmt,
      $.macro_def_stmt,
      $.op_stmt,
      $.out_stmt,
      $.out_union_stmt,
      $.out_union_parent_child_stmt,
      $.previous_schema_stmt,
      $.proc_savepoint_stmt,
      $.release_savepoint_stmt,
      $.return_stmt,
      $.rollback_return_stmt,
      $.rollback_trans_stmt,
      $.savepoint_stmt,
      $.select_stmt,
      $.schema_ad_hoc_migration_stmt,
      $.schema_unsub_stmt,
      $.schema_upgrade_script_stmt,
      $.schema_upgrade_version_stmt,
      $.set_stmt,
      $.switch_stmt,
      $.throw_stmt,
      $.trycatch_stmt,
      $.update_cursor_stmt,
      $.update_stmt,
      $.upsert_stmt,
      $.while_stmt,
      $.with_upsert_stmt,
      $.keep_table_name_in_aliases_stmt),

    explain_stmt: $ => seq($.EXPLAIN, optional($.opt_query_plan), $.explain_target),

    opt_query_plan: $ => $.QUERY_PLAN,

    explain_target: $ => choice(
      $.select_stmt,
      $.begin_trans_stmt,
      $.commit_trans_stmt,
      $.delete_stmt,
      $.drop_index_stmt,
      $.drop_table_stmt,
      $.drop_trigger_stmt,
      $.drop_view_stmt,
      $.insert_stmt,
      $.update_stmt,
      $.upsert_stmt,
      $.with_upsert_stmt),

    previous_schema_stmt: $ => $.AT_PREVIOUS_SCHEMA,

    schema_upgrade_script_stmt: $ => $.AT_SCHEMA_UPGRADE_SCRIPT,

    schema_upgrade_version_stmt: $ => seq($.AT_SCHEMA_UPGRADE_VERSION, '(', $.INT_LIT, ')'),

    set_stmt: $ => choice(
      seq($.SET, $.sql_name, ":=", $.expr),
      seq($.SET, $.sql_name, $.FROM, $.CURSOR, $.name),
      seq($.SET, $.sql_name, '[', optional($.arg_list), ']', ":=", $.expr)),

    let_stmt: $ => seq($.LET, $.sql_name, ":=", $.expr),

    const_stmt: $ => seq($.CONST, $.sql_name, ":=", $.expr),

    version_attrs_opt_recreate: $ => choice(
      seq($.AT_RECREATE, optional($.opt_delete_plain_attr)),
      seq($.AT_RECREATE, '(', $.name, ')', optional($.opt_delete_plain_attr)),
      $.version_attrs),

    opt_delete_plain_attr: $ => $.AT_DELETE,

    version_attrs: $ => choice(
      seq($.AT_CREATE, $.version_annotation, optional($.version_attrs)),
      seq($.AT_DELETE, $.version_annotation, optional($.version_attrs))),

    opt_delete_version_attr: $ => seq($.AT_DELETE, $.version_annotation),

    drop_table_stmt: $ => choice(
      seq($.DROP, $.TABLE, $.IF, $.EXISTS, $.sql_name),
      seq($.DROP, $.TABLE, $.sql_name)),

    drop_view_stmt: $ => choice(
      seq($.DROP, $.VIEW, $.IF, $.EXISTS, $.sql_name),
      seq($.DROP, $.VIEW, $.sql_name)),

    drop_index_stmt: $ => choice(
      seq($.DROP, $.INDEX, $.IF, $.EXISTS, $.sql_name),
      seq($.DROP, $.INDEX, $.sql_name)),

    drop_trigger_stmt: $ => choice(
      seq($.DROP, $.TRIGGER, $.IF, $.EXISTS, $.sql_name),
      seq($.DROP, $.TRIGGER, $.sql_name)),

    create_virtual_table_stmt: $ => seq(
          $.CREATE,
          $.VIRTUAL,
          $.TABLE,
          optional($.opt_vtab_flags),
          $.sql_name,
          $.USING,
          $.name,
          optional($.opt_module_args),
          $.AS,
          '(',
          $.col_key_list,
          ')',
          optional($.opt_delete_version_attr)),

    opt_module_args: $ => choice(
      seq('(', $.misc_attr_value_list, ')'),
      seq('(', $.ARGUMENTS, $.FOLLOWING, ')')),

    create_table_stmt: $ => seq(
          $.CREATE,
          optional($.opt_temp),
          $.TABLE,
          optional($.opt_if_not_exists),
          $.sql_name,
          '(',
          $.col_key_list,
          ')',
          optional($.opt_no_rowid),
          optional($.version_attrs_opt_recreate)),

    opt_temp: $ => $.TEMP,

    opt_if_not_exists: $ => seq($.IF, $.NOT, $.EXISTS),

    opt_no_rowid: $ => seq($.WITHOUT, $.ROWID),

    opt_vtab_flags: $ => choice(
      seq($.IF, $.NOT, $.EXISTS),
      $.AT_EPONYMOUS,
      seq($.AT_EPONYMOUS, $.IF, $.NOT, $.EXISTS),
      seq($.IF, $.NOT, $.EXISTS, $.AT_EPONYMOUS)),

    col_key_list: $ => choice(
      $.col_key_def,
      seq($.col_key_def, ',', $.col_key_list)),

    col_key_def: $ => choice(
      $.col_def,
      $.pk_def,
      $.fk_def,
      $.unq_def,
      $.check_def,
      $.shape_def),

    check_def: $ => choice(
      seq($.CONSTRAINT, $.name, $.CHECK, '(', $.expr, ')'),
      seq($.CHECK, '(', $.expr, ')')),

    shape_exprs: $ => choice(
      seq($.shape_expr, ',', $.shape_exprs),
      $.shape_expr),

    shape_expr: $ => choice(
      $.sql_name,
      seq('-', $.sql_name)),

    shape_def: $ => choice(
      $.shape_def_base,
      seq($.shape_def_base, '(', $.shape_exprs, ')')),

    shape_def_base: $ => choice(
      seq($.LIKE, $.sql_name),
      seq($.LIKE, $.name, $.ARGUMENTS)),

    sql_name: $ => choice(
      $.name,
      $.QID),

    misc_attr_key: $ => choice(
      $.name,
      seq($.name, ':', $.name)),

    cql_attr_key: $ => choice(
      $.name,
      seq($.name, ':', $.name)),

    misc_attr_value_list: $ => choice(
      $.misc_attr_value,
      seq($.misc_attr_value, ',', $.misc_attr_value_list)),

    misc_attr_value: $ => choice(
      $.sql_name,
      $.any_literal,
      $.const_expr,
      seq('(', $.misc_attr_value_list, ')'),
      seq('-', $.num_literal),
      seq('+', $.num_literal)),

    misc_attr: $ => choice(
      seq($.AT_ATTRIBUTE, '(', $.misc_attr_key, ')'),
      seq($.AT_ATTRIBUTE, '(', $.misc_attr_key, '=', $.misc_attr_value, ')'),
      seq('[', '[', $.cql_attr_key, ']', ']'),
      seq('[', '[', $.cql_attr_key, '=', $.misc_attr_value, ']', ']')),

    misc_attrs: $ => seq($.misc_attr, optional($.misc_attrs)),

    col_def: $ => seq(optional($.misc_attrs), $.sql_name, $.data_type_any, optional($.col_attrs)),

    pk_def: $ => choice(
      seq(
          $.CONSTRAINT,
          $.sql_name,
          $.PRIMARY,
          $.KEY,
          '(',
          $.indexed_columns,
          ')',
          optional($.conflict_clause)),
      seq($.PRIMARY, $.KEY, '(', $.indexed_columns, ')', optional($.conflict_clause))),

    conflict_clause: $ => choice(
      seq($.ON_CONFLICT, $.ROLLBACK),
      seq($.ON_CONFLICT, $.ABORT),
      seq($.ON_CONFLICT, $.FAIL),
      seq($.ON_CONFLICT, $.IGNORE),
      seq($.ON_CONFLICT, $.REPLACE)),

    fk_options: $ => choice(
      $.fk_on_options,
      $.fk_deferred_options,
      seq($.fk_on_options, $.fk_deferred_options)),

    fk_on_options: $ => choice(
      seq($.ON, $.DELETE, $.fk_action),
      seq($.ON, $.UPDATE, $.fk_action),
      seq($.ON, $.UPDATE, $.fk_action, $.ON, $.DELETE, $.fk_action),
      seq($.ON, $.DELETE, $.fk_action, $.ON, $.UPDATE, $.fk_action)),

    fk_action: $ => choice(
      seq($.SET, $.NULL),
      seq($.SET, $.DEFAULT),
      $.CASCADE,
      $.RESTRICT,
      seq($.NO, $.ACTION)),

    fk_deferred_options: $ => choice(
      seq($.DEFERRABLE, optional($.fk_initial_state)),
      seq($.NOT_DEFERRABLE, optional($.fk_initial_state))),

    fk_initial_state: $ => choice(
      seq($.INITIALLY, $.DEFERRED),
      seq($.INITIALLY, $.IMMEDIATE)),

    fk_def: $ => choice(
      seq($.CONSTRAINT, $.sql_name, $.FOREIGN, $.KEY, '(', $.sql_name_list, ')', $.fk_target_options),
      seq($.FOREIGN, $.KEY, '(', $.sql_name_list, ')', $.fk_target_options)),

    fk_target_options: $ => prec.left(seq($.REFERENCES, $.sql_name, '(', $.sql_name_list, ')', optional($.fk_options))),

    unq_def: $ => choice(
      seq($.CONSTRAINT, $.sql_name, $.UNIQUE, '(', $.indexed_columns, ')', optional($.conflict_clause)),
      seq($.UNIQUE, '(', $.indexed_columns, ')', optional($.conflict_clause))),

    opt_unique: $ => $.UNIQUE,

    indexed_column: $ => seq($.expr, optional($.opt_asc_desc)),

    indexed_columns: $ => choice(
      $.indexed_column,
      seq($.indexed_column, ',', $.indexed_columns)),

    create_index_stmt: $ => seq(
          $.CREATE,
          optional($.opt_unique),
          $.INDEX,
          optional($.opt_if_not_exists),
          $.sql_name,
          $.ON,
          $.sql_name,
          '(',
          $.indexed_columns,
          ')',
          optional($.opt_where),
          optional($.opt_delete_version_attr)),

    name: $ => choice(
      $.ID,
      $.ABORT,
      $.ACTION,
      $.ADD,
      $.AFTER,
      $.ALTER,
      $.ASC,
      seq($.AT_ID, '(', $.text_args, ')'),
      seq($.AT_TMP, '(', $.text_args, ')'),
      $.AUTOINCREMENT,
      $.BEFORE,
      $.CASCADE,
      $.COLUMN,
      $.CREATE,
      $.CTE_TABLES,
      $.DEFAULT,
      $.DEFERRABLE,
      $.DEFERRED,
      $.DELETE,
      $.DESC,
      $.DROP,
      $.ENCODE,
      $.EXCLUSIVE,
      $.EXPLAIN,
      $.EXPR,
      $.FAIL,
      $.FETCH,
      $.FIRST,
      $.FOLLOWING,
      $.GROUPS,
      $.HIDDEN,
      $.IGNORE,
      $.IMMEDIATE,
      $.INDEX,
      $.INITIALLY,
      $.INSTEAD,
      $.INTO,
      $.KEY,
      $.LAST,
      $.NULLS,
      $.OUTER,
      $.PARTITION,
      $.PRECEDING,
      $.PRIVATE,
      $.QUERY_PARTS,
      $.RANGE,
      $.REFERENCES,
      $.RELEASE,
      $.RENAME,
      $.REPLACE,
      $.RESTRICT,
      $.ROWID,
      $.SAVEPOINT,
      $.SELECT_CORE,
      $.SELECT_EXPR,
      $.STATEMENT,
      $.STMT_LIST,
      $.TABLE,
      $.TEMP,
      $.TEXT,
      $.TRANSACTION,
      $.TRIGGER,
      $.TYPE,
      $.VIEW,
      $.VIRTUAL,
      $.WITHOUT),

    loose_name: $ => prec.left(100, choice(
      $.name,
      $.CALL,
      $.SET,
      $.BOOL,
      $.INT,
      $.LONG,
      $.REAL,
      $.BLOB,
      $.OBJECT,
      $.RIGHT,
      $.LEFT)),

    loose_name_or_type: $ => choice(
      $.loose_name,
      $.ALL,
      seq($.loose_name, '<', $.loose_name, '>')),

    name_list: $ => choice(
      $.name,
      seq($.name, ',', $.name_list)),

    sql_name_list: $ => choice(
      $.sql_name,
      seq($.sql_name, ',', $.sql_name_list)),

    cte_binding_list: $ => choice(
      $.cte_binding,
      seq($.cte_binding, ',', $.cte_binding_list)),

    cte_binding: $ => choice(
      seq($.name, $.name),
      seq($.name, $.AS, $.name)),

    col_attrs: $ => choice(
      seq($.not_null, optional($.conflict_clause), optional($.col_attrs)),
      seq($.PRIMARY, $.KEY, optional($.conflict_clause), optional($.col_attrs)),
      seq($.PRIMARY, $.KEY, optional($.conflict_clause), $.AUTOINCREMENT, optional($.col_attrs)),
      seq($.DEFAULT, '-', $.num_literal, optional($.col_attrs)),
      seq($.DEFAULT, '+', $.num_literal, optional($.col_attrs)),
      seq($.DEFAULT, $.num_literal, optional($.col_attrs)),
      seq($.DEFAULT, $.const_expr, optional($.col_attrs)),
      seq($.DEFAULT, $.str_literal, optional($.col_attrs)),
      seq($.COLLATE, $.name, optional($.col_attrs)),
      seq($.CHECK, '(', $.expr, ')', optional($.col_attrs)),
      seq($.UNIQUE, optional($.conflict_clause), optional($.col_attrs)),
      seq($.HIDDEN, optional($.col_attrs)),
      seq($.AT_SENSITIVE, optional($.col_attrs)),
      seq($.AT_CREATE, $.version_annotation, optional($.col_attrs)),
      seq($.AT_DELETE, $.version_annotation, optional($.col_attrs)),
      seq($.fk_target_options, optional($.col_attrs))),

    version_annotation: $ => choice(
      seq('(', $.INT_LIT, ',', $.name, ')'),
      seq('(', $.INT_LIT, ',', $.name, ':', $.name, ')'),
      seq('(', $.INT_LIT, ')')),

    opt_kind: $ => seq('<', $.name, '>'),

    data_type_numeric: $ => choice(
      seq($.INT, optional($.opt_kind)),
      seq($.INTEGER, optional($.opt_kind)),
      seq($.REAL, optional($.opt_kind)),
      seq($.LONG, optional($.opt_kind)),
      seq($.BOOL, optional($.opt_kind)),
      seq($.LONG, $.INTEGER, optional($.opt_kind)),
      seq($.LONG, $.INT, optional($.opt_kind)),
      seq($.LONG_INT, optional($.opt_kind)),
      seq($.LONG_INTEGER, optional($.opt_kind))),

    data_type_any: $ => choice(
      $.data_type_numeric,
      seq($.TEXT, optional($.opt_kind)),
      seq($.BLOB, optional($.opt_kind)),
      seq($.OBJECT, optional($.opt_kind)),
      seq($.OBJECT, '<', $.name, $.CURSOR, '>'),
      seq($.OBJECT, '<', $.name, $.SET, '>'),
      $.ID,
      seq($.AT_ID, '(', $.text_args, ')')),

    not_null: $ => choice(
      seq($.NOT, $.NULL),
      '!'),

    data_type_with_options: $ => choice(
      $.data_type_any,
      seq($.data_type_any, $.not_null),
      seq($.data_type_any, $.AT_SENSITIVE),
      seq($.data_type_any, $.AT_SENSITIVE, $.not_null),
      seq($.data_type_any, $.not_null, $.AT_SENSITIVE)),

    str_literal: $ => $.str_chain,

    str_chain: $ => choice(
      $.str_leaf,
      seq($.str_leaf, $.str_chain)),

    str_leaf: $ => choice(
      $.STR_LIT,
      $.C_STR_LIT),

    num_literal: $ => choice(
      $.INT_LIT,
      $.LONG_LIT,
      $.REAL_LIT,
      $.TRUE,
      $.FALSE),

    const_expr: $ => seq($.CONST, '(', $.expr, ')'),

    any_literal: $ => choice(
      $.str_literal,
      $.num_literal,
      $.NULL,
      seq($.AT_FILE, '(', $.str_literal, ')'),
      $.AT_LINE,
      $.AT_MACRO_LINE,
      $.AT_MACRO_FILE,
      $.AT_PROC,
      seq($.AT_TEXT, '(', $.text_args, ')'),
      $.BLOB_LIT),

    text_args: $ => choice(
      $.text_arg,
      seq($.text_arg, ',', $.text_args)),

    text_arg: $ => $.expr,

    raise_expr: $ => choice(
      seq($.RAISE, '(', $.IGNORE, ')'),
      seq($.RAISE, '(', $.ROLLBACK, ',', $.expr, ')'),
      seq($.RAISE, '(', $.ABORT, ',', $.expr, ')'),
      seq($.RAISE, '(', $.FAIL, ',', $.expr, ')')),

    simple_call: $ => choice(
      seq(
          $.loose_name,
          '(',
          optional($.DISTINCT),
          optional($.arg_list),
          ')',
          optional($.opt_filter_clause)),
      seq($.GLOB, '(', optional($.DISTINCT), optional($.arg_list), ')', optional($.opt_filter_clause)),
      seq($.LIKE, '(', optional($.DISTINCT), optional($.arg_list), ')', optional($.opt_filter_clause))),

    call: $ => choice(
      $.simple_call,
      seq($.basic_expr, ':', $.simple_call),
      seq($.basic_expr, ':', $.loose_name),
      seq($.basic_expr, ':', '(', optional($.arg_list), ')'),
      seq($.basic_expr, ':', $.ID, '!'),
      seq($.basic_expr, ':', $.ID, '!', '(', optional($.macro_args), ')')),

    basic_expr: $ => prec.left(1, choice(
      $.name,
      $.QID,
      $.macro_ref,
      '*',
      $.AT_RC,
      seq($.basic_expr, '.', $.sql_name),
      seq($.basic_expr, '.', '*'),
      $.any_literal,
      $.const_expr,
      seq('(', $.expr, ')'),
      $.call,
      $.window_func_inv,
      $.raise_expr,
      seq('(', $.select_stmt, ')'),
      seq('(', $.select_stmt, $.IF, $.NOTHING, $.expr, ')'),
      seq('(', $.select_stmt, $.IF, $.NOTHING, $.THEN, $.expr, ')'),
      seq('(', $.select_stmt, $.IF, $.NOTHING, $.OR, $.NULL, $.expr, ')'),
      seq('(', $.select_stmt, $.IF, $.NOTHING, $.OR, $.NULL, $.THEN, $.expr, ')'),
      seq('(', $.select_stmt, $.IF, $.NOTHING, $.THROW, ')'),
      seq('(', $.select_stmt, $.IF, $.NOTHING, $.THEN, $.THROW, ')'),
      seq($.EXISTS, '(', $.select_stmt, ')'),
      seq($.CASE, $.expr, $.case_list, $.END),
      seq($.CASE, $.expr, $.case_list, $.ELSE, $.expr, $.END),
      seq($.CASE, $.case_list, $.END),
      seq($.CASE, $.case_list, $.ELSE, $.expr, $.END),
      seq($.CAST, '(', $.expr, $.AS, $.data_type_any, ')'),
      seq($.TYPE_CHECK, '(', $.expr, $.AS, $.data_type_with_options, ')'),
      seq($.basic_expr, '[', optional($.arg_list), ']'),
      seq($.basic_expr, '~', $.data_type_any, '~'),
      seq($.basic_expr, "->", $.basic_expr),
      seq($.basic_expr, "->>", '~', $.data_type_any, '~', $.basic_expr))),

    math_expr: $ => prec.left(1, choice(
      $.basic_expr,
      seq($.math_expr, '&', $.math_expr),
      seq($.math_expr, '|', $.math_expr),
      seq($.math_expr, "<<", $.math_expr),
      seq($.math_expr, ">>", $.math_expr),
      seq($.math_expr, '+', $.math_expr),
      seq($.math_expr, '-', $.math_expr),
      seq($.math_expr, '*', $.math_expr),
      seq($.math_expr, '/', $.math_expr),
      seq($.math_expr, '%', $.math_expr),
      seq($.math_expr, $.IS_NOT_TRUE),
      seq($.math_expr, $.IS_NOT_FALSE),
      seq($.math_expr, $.ISNULL),
      seq($.math_expr, $.NOTNULL),
      seq($.math_expr, $.IS_TRUE),
      seq($.math_expr, $.IS_FALSE),
      seq('-', $.math_expr),
      seq('+', $.math_expr),
      seq('~', $.math_expr),
      seq($.NOT, $.math_expr),
      seq($.math_expr, '=', $.math_expr),
      seq($.math_expr, "==", $.math_expr),
      seq($.math_expr, '<', $.math_expr),
      seq($.math_expr, '>', $.math_expr),
      seq($.math_expr, "<>", $.math_expr),
      seq($.math_expr, "!=", $.math_expr),
      seq($.math_expr, ">=", $.math_expr),
      seq($.math_expr, "<=", $.math_expr),
      seq($.math_expr, $.NOT_IN, '(', optional($.expr_list), ')'),
      seq($.math_expr, $.NOT_IN, '(', $.select_stmt, ')'),
      seq($.math_expr, $.IN, '(', optional($.expr_list), ')'),
      seq($.math_expr, $.IN, '(', $.select_stmt, ')'),
      seq($.math_expr, $.LIKE, $.math_expr),
      seq($.math_expr, $.NOT_LIKE, $.math_expr),
      seq($.math_expr, $.MATCH, $.math_expr),
      seq($.math_expr, $.NOT_MATCH, $.math_expr),
      seq($.math_expr, $.REGEXP, $.math_expr),
      seq($.math_expr, $.NOT_REGEXP, $.math_expr),
      seq($.math_expr, $.GLOB, $.math_expr),
      seq($.math_expr, $.NOT_GLOB, $.math_expr),
      seq($.math_expr, $.BETWEEN, $.math_expr, $.AND, $.math_expr),
      seq($.math_expr, $.NOT_BETWEEN, $.math_expr, $.AND, $.math_expr),
      seq($.math_expr, $.IS_NOT, $.math_expr),
      seq($.math_expr, $.IS, $.math_expr),
      seq($.math_expr, "||", $.math_expr),
      seq($.math_expr, $.COLLATE, $.name))),

    expr: $ => prec.left(1, choice(
      $.math_expr,
      seq($.expr, $.AND, $.expr),
      seq($.expr, $.OR, $.expr),
      seq($.expr, ":=", $.expr),
      seq($.expr, "+=", $.expr),
      seq($.expr, "-=", $.expr),
      seq($.expr, "/=", $.expr),
      seq($.expr, "*=", $.expr),
      seq($.expr, "%=", $.expr),
      seq($.expr, "&=", $.expr),
      seq($.expr, "|=", $.expr),
      seq($.expr, "<<=", $.expr),
      seq($.expr, ">>=", $.expr))),

    case_list: $ => choice(
      seq($.WHEN, $.expr, $.THEN, $.expr),
      seq($.WHEN, $.expr, $.THEN, $.expr, $.case_list)),

    arg_expr: $ => choice(
      $.expr,
      $.shape_arguments),

    arg_exprs: $ => choice(
      $.arg_expr,
      seq($.arg_expr, ',', $.arg_exprs)),

    arg_list: $ => $.arg_exprs,

    expr_list: $ => choice(
      $.expr,
      seq($.expr, ',', $.expr_list)),

    shape_arguments: $ => choice(
      seq($.FROM, $.name),
      seq($.FROM, $.name, $.shape_def),
      seq($.FROM, $.ARGUMENTS),
      seq($.FROM, $.ARGUMENTS, $.shape_def)),

    column_calculation: $ => choice(
      seq($.AT_COLUMNS, '(', $.col_calcs, ')'),
      seq($.AT_COLUMNS, '(', $.DISTINCT, $.col_calcs, ')')),

    col_calcs: $ => choice(
      $.col_calc,
      seq($.col_calc, ',', $.col_calcs)),

    col_calc: $ => choice(
      $.name,
      $.shape_def,
      seq($.name, $.shape_def),
      seq($.name, '.', $.name)),

    cte_tables: $ => choice(
      $.cte_table,
      seq($.cte_table, ',', $.cte_tables)),

    cte_decl: $ => prec.left(1, choice(
      seq($.name, '(', $.sql_name_list, ')'),
      seq($.name, '(', '*', ')'),
      $.name)),

    shared_cte: $ => choice(
      $.call_stmt,
      seq($.call_stmt, $.USING, $.cte_binding_list)),

    cte_table: $ => choice(
      seq($.cte_decl, $.AS, '(', $.select_stmt, ')'),
      seq($.cte_decl, $.AS, '(', $.shared_cte, ')'),
      seq('(', $.call_stmt, ')'),
      seq('(', $.call_stmt, $.USING, $.cte_binding_list, ')'),
      seq($.cte_decl, $.LIKE, '(', $.select_stmt, ')'),
      seq($.cte_decl, $.LIKE, $.sql_name),
      $.macro_ref),

    with_prefix: $ => choice(
      seq($.WITH, $.cte_tables),
      seq($.WITH, $.RECURSIVE, $.cte_tables)),

    with_select_stmt: $ => seq($.with_prefix, $.select_stmt_no_with),

    select_nothing_stmt: $ => seq($.SELECT, $.NOTHING),

    select_stmt: $ => choice(
      $.with_select_stmt,
      $.select_stmt_no_with),

    select_stmt_no_with: $ => seq($.select_core_list, optional($.opt_orderby), optional($.opt_limit), optional($.opt_offset)),

    select_core_list: $ => choice(
      $.select_core,
      seq($.select_core, $.compound_operator, $.select_core_list)),

    values: $ => choice(
      seq('(', optional($.insert_list), ')'),
      seq('(', optional($.insert_list), ')', ',', $.values)),

    select_core: $ => choice(
      seq(
          $.SELECT,
          optional($.select_opts),
          $.select_expr_list,
          optional($.opt_from_query_parts),
          optional($.opt_where),
          optional($.opt_groupby),
          optional($.opt_having),
          optional($.opt_select_window)),
      seq($.ROWS, '(', $.macro_ref, ')'),
      seq($.VALUES, $.values)),

    compound_operator: $ => choice(
      $.UNION,
      $.UNION_ALL,
      $.INTERSECT,
      $.EXCEPT),

    window_func_inv: $ => seq($.simple_call, $.OVER, $.window_name_or_defn),

    opt_filter_clause: $ => seq($.FILTER, '(', optional($.opt_where), ')'),

    window_name_or_defn: $ => choice(
      $.window_defn,
      $.name),

    window_defn: $ => seq('(', optional($.opt_partition_by), optional($.opt_orderby), optional($.opt_frame_spec), ')'),

    opt_frame_spec: $ => seq($.frame_type, $.frame_boundary_opts, optional($.frame_exclude)),

    frame_type: $ => choice(
      $.RANGE,
      $.ROWS,
      $.GROUPS),

    frame_exclude: $ => choice(
      $.EXCLUDE_NO_OTHERS,
      $.EXCLUDE_CURRENT_ROW,
      $.EXCLUDE_GROUP,
      $.EXCLUDE_TIES),

    frame_boundary_opts: $ => choice(
      $.frame_boundary,
      seq($.BETWEEN, $.frame_boundary_start, $.AND, $.frame_boundary_end)),

    frame_boundary_start: $ => choice(
      seq($.UNBOUNDED, $.PRECEDING),
      seq($.expr, $.PRECEDING),
      $.CURRENT_ROW,
      seq($.expr, $.FOLLOWING)),

    frame_boundary_end: $ => choice(
      seq($.expr, $.PRECEDING),
      $.CURRENT_ROW,
      seq($.expr, $.FOLLOWING),
      seq($.UNBOUNDED, $.FOLLOWING)),

    frame_boundary: $ => choice(
      seq($.UNBOUNDED, $.PRECEDING),
      seq($.expr, $.PRECEDING),
      $.CURRENT_ROW),

    opt_partition_by: $ => seq($.PARTITION, $.BY, $.expr_list),

    opt_select_window: $ => $.window_clause,

    window_clause: $ => seq($.WINDOW, $.window_name_defn_list),

    window_name_defn_list: $ => choice(
      $.window_name_defn,
      seq($.window_name_defn, ',', $.window_name_defn_list)),

    window_name_defn: $ => seq($.name, $.AS, $.window_defn),

    region_spec: $ => choice(
      $.name,
      seq($.name, $.PRIVATE)),

    region_list: $ => choice(
      seq($.region_spec, ',', $.region_list),
      $.region_spec),

    declare_schema_region_stmt: $ => choice(
      seq($.AT_DECLARE_SCHEMA_REGION, $.name),
      seq($.AT_DECLARE_SCHEMA_REGION, $.name, $.USING, $.region_list)),

    declare_deployable_region_stmt: $ => choice(
      seq($.AT_DECLARE_DEPLOYABLE_REGION, $.name),
      seq($.AT_DECLARE_DEPLOYABLE_REGION, $.name, $.USING, $.region_list)),

    begin_schema_region_stmt: $ => seq($.AT_BEGIN_SCHEMA_REGION, $.name),

    end_schema_region_stmt: $ => $.AT_END_SCHEMA_REGION,

    schema_unsub_stmt: $ => seq($.AT_UNSUB, '(', $.sql_name, ')'),

    schema_ad_hoc_migration_stmt: $ => choice(
      seq($.AT_SCHEMA_AD_HOC_MIGRATION, $.version_annotation),
      seq($.AT_SCHEMA_AD_HOC_MIGRATION, $.FOR, $.AT_RECREATE, '(', $.name, ',', $.name, ')')),

    emit_enums_stmt: $ => seq($.AT_EMIT_ENUMS, optional($.name_list)),

    emit_group_stmt: $ => seq($.AT_EMIT_GROUP, optional($.name_list)),

    emit_constants_stmt: $ => seq($.AT_EMIT_CONSTANTS, $.name_list),

    opt_from_query_parts: $ => seq($.FROM, $.query_parts),

    opt_where: $ => seq($.WHERE, $.expr),

    opt_groupby: $ => seq($.GROUP, $.BY, $.groupby_list),

    groupby_list: $ => choice(
      $.groupby_item,
      seq($.groupby_item, ',', $.groupby_list)),

    groupby_item: $ => $.expr,

    opt_asc_desc: $ => choice(
      seq($.ASC, optional($.opt_nullsfirst_nullslast)),
      seq($.DESC, optional($.opt_nullsfirst_nullslast))),

    opt_nullsfirst_nullslast: $ => choice(
      seq($.NULLS, $.FIRST),
      seq($.NULLS, $.LAST)),

    opt_having: $ => seq($.HAVING, $.expr),

    opt_orderby: $ => seq($.ORDER, $.BY, $.orderby_list),

    orderby_list: $ => choice(
      $.orderby_item,
      seq($.orderby_item, ',', $.orderby_list)),

    orderby_item: $ => seq($.expr, optional($.opt_asc_desc)),

    opt_limit: $ => seq($.LIMIT, $.expr),

    opt_offset: $ => seq($.OFFSET, $.expr),

    select_opts: $ => choice(
      $.ALL,
      $.DISTINCT,
      $.DISTINCTROW),

    select_expr_list: $ => choice(
      $.select_expr,
      seq($.select_expr, ',', $.select_expr_list)),

    select_expr: $ => choice(
      seq($.expr, optional($.as_alias)),
      $.column_calculation),

    as_alias: $ => choice(
      seq($.AS, $.sql_name),
      $.sql_name),

    query_parts: $ => choice(
      $.table_or_subquery_list,
      $.join_clause),

    table_or_subquery_list: $ => choice(
      $.table_or_subquery,
      seq($.table_or_subquery, ',', $.table_or_subquery_list)),

    join_clause: $ => seq($.table_or_subquery, $.join_target_list),

    join_target_list: $ => choice(
      $.join_target,
      seq($.join_target, $.join_target_list)),

    table_or_subquery: $ => choice(
      seq($.sql_name, optional($.as_alias)),
      seq('(', $.select_stmt, ')', optional($.as_alias)),
      seq('(', $.shared_cte, ')', optional($.as_alias)),
      seq($.table_function, optional($.as_alias)),
      seq('(', $.query_parts, ')'),
      seq($.macro_ref, optional($.as_alias))),

    join_type: $ => choice(
      $.LEFT,
      $.RIGHT,
      seq($.LEFT, $.OUTER),
      seq($.RIGHT, $.OUTER),
      $.INNER,
      $.CROSS),

    join_target: $ => prec.left(seq(optional($.join_type), $.JOIN, $.table_or_subquery, optional($.join_cond))),

    join_cond: $ => choice(
      seq($.ON, $.expr),
      seq($.USING, '(', $.name_list, ')')),

    table_function: $ => seq($.name, '(', optional($.arg_list), ')'),

    create_view_stmt: $ => choice(
      seq(
          $.CREATE,
          optional($.opt_temp),
          $.VIEW,
          optional($.opt_if_not_exists),
          $.sql_name,
          $.AS,
          $.select_stmt,
          optional($.opt_delete_version_attr)),
      seq(
          $.CREATE,
          optional($.opt_temp),
          $.VIEW,
          optional($.opt_if_not_exists),
          $.sql_name,
          '(',
          $.name_list,
          ')',
          $.AS,
          $.select_stmt,
          optional($.opt_delete_version_attr))),

    delete_stmt: $ => choice(
      $.delete_stmt_plain,
      seq($.delete_stmt_plain, $.returning_suffix),
      seq($.with_prefix, $.delete_stmt_plain),
      seq($.with_prefix, $.delete_stmt_plain, $.returning_suffix)),

    delete_stmt_plain: $ => seq($.DELETE, $.FROM, $.sql_name, optional($.opt_where)),

    opt_insert_dummy_spec: $ => seq($.AT_DUMMY_SEED, '(', $.expr, ')', optional($.dummy_modifier)),

    dummy_modifier: $ => choice(
      $.AT_DUMMY_NULLABLES,
      $.AT_DUMMY_DEFAULTS,
      seq($.AT_DUMMY_NULLABLES, $.AT_DUMMY_DEFAULTS),
      seq($.AT_DUMMY_DEFAULTS, $.AT_DUMMY_NULLABLES)),

    insert_stmt_type: $ => choice(
      seq($.INSERT, $.INTO),
      seq($.INSERT, $.OR, $.REPLACE, $.INTO),
      seq($.INSERT, $.OR, $.IGNORE, $.INTO),
      seq($.INSERT, $.OR, $.ROLLBACK, $.INTO),
      seq($.INSERT, $.OR, $.ABORT, $.INTO),
      seq($.INSERT, $.OR, $.FAIL, $.INTO),
      seq($.REPLACE, $.INTO)),

    opt_column_spec: $ => choice(
      seq('(', optional($.sql_name_list), ')'),
      seq('(', $.shape_def, ')')),

    column_spec: $ => choice(
      seq('(', $.sql_name_list, ')'),
      seq('(', $.shape_def, ')')),

    from_shape: $ => choice(
      seq($.FROM, $.CURSOR, $.name, optional($.opt_column_spec)),
      seq($.FROM, $.name, optional($.opt_column_spec)),
      seq($.FROM, $.ARGUMENTS, optional($.opt_column_spec))),

    insert_stmt_plain: $ => choice(
      seq(
          $.insert_stmt_type,
          $.sql_name,
          optional($.opt_column_spec),
          $.select_stmt,
          optional($.opt_insert_dummy_spec)),
      seq(
          $.insert_stmt_type,
          $.sql_name,
          optional($.opt_column_spec),
          $.from_shape,
          optional($.opt_insert_dummy_spec)),
      seq($.insert_stmt_type, $.sql_name, $.DEFAULT, $.VALUES),
      seq($.insert_stmt_type, $.sql_name, $.USING, $.select_stmt),
      seq($.insert_stmt_type, $.sql_name, $.USING, $.expr_names, optional($.opt_insert_dummy_spec))),

    returning_suffix: $ => seq($.RETURNING, '(', $.select_expr_list, ')'),

    insert_stmt: $ => choice(
      $.insert_stmt_plain,
      seq($.insert_stmt_plain, $.returning_suffix),
      seq($.with_prefix, $.insert_stmt_plain),
      seq($.with_prefix, $.insert_stmt_plain, $.returning_suffix)),

    insert_list_item: $ => choice(
      $.expr,
      $.shape_arguments),

    insert_list: $ => choice(
      $.insert_list_item,
      seq($.insert_list_item, ',', optional($.insert_list))),

    basic_update_stmt: $ => seq(
          $.UPDATE,
          optional($.sql_name),
          $.SET,
          $.update_list,
          optional($.opt_from_query_parts),
          optional($.opt_where)),

    update_stmt: $ => choice(
      $.update_stmt_plain,
      seq($.update_stmt_plain, $.returning_suffix),
      seq($.with_prefix, $.update_stmt_plain),
      seq($.with_prefix, $.update_stmt_plain, $.returning_suffix)),

    update_stmt_plain: $ => choice(
      seq(
          $.UPDATE,
          $.sql_name,
          $.SET,
          $.update_list,
          optional($.opt_from_query_parts),
          optional($.opt_where),
          optional($.opt_orderby),
          optional($.opt_limit)),
      seq(
          $.UPDATE,
          $.sql_name,
          $.SET,
          $.column_spec,
          '=',
          '(',
          optional($.insert_list),
          ')',
          optional($.opt_from_query_parts),
          optional($.opt_where),
          optional($.opt_orderby),
          optional($.opt_limit))),

    update_entry: $ => seq($.sql_name, '=', $.expr),

    update_list: $ => choice(
      $.update_entry,
      seq($.update_entry, ',', $.update_list)),

    with_upsert_stmt: $ => seq($.with_prefix, $.upsert_stmt),

    upsert_stmt: $ => choice(
      seq($.insert_stmt_plain, $.ON_CONFLICT, optional($.conflict_target), $.DO, $.NOTHING),
      seq($.insert_stmt_plain, $.ON_CONFLICT, optional($.conflict_target), $.DO, $.basic_update_stmt)),

    update_cursor_stmt: $ => choice(
      seq(
          $.UPDATE,
          $.CURSOR,
          $.name,
          optional($.opt_column_spec),
          $.FROM,
          $.VALUES,
          '(',
          optional($.insert_list),
          ')'),
      seq($.UPDATE, $.CURSOR, $.name, optional($.opt_column_spec), $.from_shape),
      seq($.UPDATE, $.CURSOR, $.name, $.USING, $.expr_names)),

    conflict_target: $ => seq('(', $.indexed_columns, ')', optional($.opt_where)),

    function: $ => choice(
      $.FUNC,
      $.FUNCTION),

    declare_out_call_stmt: $ => seq($.DECLARE, $.OUT, $.call_stmt),

    declare_enum_stmt: $ => seq($.DECLARE, $.ENUM, $.name, $.data_type_numeric, '(', $.enum_values, ')'),

    enum_values: $ => choice(
      $.enum_value,
      seq($.enum_value, ',', $.enum_values)),

    enum_value: $ => choice(
      $.name,
      seq($.name, '=', $.expr)),

    declare_const_stmt: $ => seq($.DECLARE, $.CONST, $.GROUP, $.name, '(', $.const_values, ')'),

    declare_group_stmt: $ => seq($.DECLARE, $.GROUP, $.name, $.BEGIN, $.simple_variable_decls, $.END),

    simple_variable_decls: $ => choice(
      seq($.declare_vars_stmt, ';'),
      seq($.declare_vars_stmt, ';', $.simple_variable_decls)),

    const_values: $ => choice(
      $.const_value,
      seq($.const_value, ',', $.const_values)),

    const_value: $ => seq($.name, '=', $.expr),

    declare_select_func_stmt: $ => choice(
      seq($.DECLARE, $.SELECT, $.function, $.name, '(', optional($.params), ')', $.data_type_with_options),
      seq($.DECLARE, $.SELECT, $.function, $.name, '(', optional($.params), ')', '(', $.typed_names, ')'),
      seq($.DECLARE, $.SELECT, $.function, $.name, $.NO, $.CHECK, $.data_type_with_options),
      seq($.DECLARE, $.SELECT, $.function, $.name, $.NO, $.CHECK, '(', $.typed_names, ')')),

    declare_func_stmt: $ => choice(
      seq(
          $.DECLARE,
          $.function,
          $.loose_name,
          '(',
          optional($.func_params),
          ')',
          $.data_type_with_options),
      seq(
          $.DECLARE,
          $.function,
          $.loose_name,
          '(',
          optional($.func_params),
          ')',
          $.CREATE,
          $.data_type_with_options),
      seq($.DECLARE, $.function, $.loose_name, $.NO, $.CHECK, $.data_type_with_options),
      seq($.DECLARE, $.function, $.loose_name, $.NO, $.CHECK, $.CREATE, $.data_type_with_options)),

    procedure: $ => choice(
      $.PROC,
      $.PROCEDURE),

    declare_proc_no_check_stmt: $ => seq($.DECLARE, $.procedure, $.loose_name, $.NO, $.CHECK),

    declare_proc_stmt: $ => choice(
      seq($.DECLARE, $.procedure, $.loose_name, '(', optional($.func_params), ')'),
      seq(
          $.DECLARE,
          $.procedure,
          $.loose_name,
          '(',
          optional($.func_params),
          ')',
          '(',
          $.typed_names,
          ')'),
      seq($.DECLARE, $.procedure, $.loose_name, '(', optional($.func_params), ')', $.USING, $.TRANSACTION),
      seq(
          $.DECLARE,
          $.procedure,
          $.loose_name,
          '(',
          optional($.func_params),
          ')',
          $.OUT,
          '(',
          $.typed_names,
          ')'),
      seq(
          $.DECLARE,
          $.procedure,
          $.loose_name,
          '(',
          optional($.func_params),
          ')',
          $.OUT,
          '(',
          $.typed_names,
          ')',
          $.USING,
          $.TRANSACTION),
      seq(
          $.DECLARE,
          $.procedure,
          $.loose_name,
          '(',
          optional($.func_params),
          ')',
          $.OUT,
          $.UNION,
          '(',
          $.typed_names,
          ')'),
      seq(
          $.DECLARE,
          $.procedure,
          $.loose_name,
          '(',
          optional($.func_params),
          ')',
          $.OUT,
          $.UNION,
          '(',
          $.typed_names,
          ')',
          $.USING,
          $.TRANSACTION)),

    declare_interface_stmt: $ => choice(
      seq($.DECLARE, $.INTERFACE, $.name, '(', $.typed_names, ')'),
      seq($.INTERFACE, $.name, '(', $.typed_names, ')')),

    create_proc_stmt: $ => choice(
      seq(
          $.CREATE,
          $.procedure,
          $.loose_name,
          '(',
          optional($.params),
          ')',
          $.BEGIN,
          optional($.stmt_list),
          $.END),
      seq($.procedure, $.loose_name, '(', optional($.params), ')', $.BEGIN, optional($.stmt_list), $.END)),

    inout: $ => choice(
      $.IN,
      $.OUT,
      $.INOUT),

    typed_name: $ => choice(
      seq($.sql_name, $.data_type_with_options),
      $.shape_def,
      seq($.name, $.shape_def)),

    typed_names: $ => choice(
      $.typed_name,
      seq($.typed_name, ',', $.typed_names)),

    func_param: $ => choice(
      $.param,
      seq($.name, $.CURSOR)),

    func_params: $ => choice(
      $.func_param,
      seq($.func_param, ',', optional($.func_params))),

    param: $ => choice(
      seq($.sql_name, $.data_type_with_options),
      seq($.inout, $.sql_name, $.data_type_with_options),
      $.shape_def,
      seq($.name, $.shape_def)),

    params: $ => choice(
      $.param,
      seq($.param, ',', optional($.params))),

    declare_value_cursor: $ => choice(
      seq($.DECLARE, $.name, $.CURSOR, $.shape_def),
      seq($.CURSOR, $.name, $.shape_def),
      seq($.DECLARE, $.name, $.CURSOR, $.LIKE, $.select_stmt),
      seq($.CURSOR, $.name, $.LIKE, $.select_stmt),
      seq($.DECLARE, $.name, $.CURSOR, $.LIKE, '(', $.typed_names, ')'),
      seq($.CURSOR, $.name, $.LIKE, '(', $.typed_names, ')')),

    row_source: $ => choice(
      $.select_stmt,
      $.explain_stmt,
      $.insert_stmt,
      $.delete_stmt,
      $.update_stmt,
      $.call_stmt),

    declare_forward_read_cursor_stmt: $ => choice(
      seq($.DECLARE, $.name, $.CURSOR, $.FOR, $.row_source),
      seq($.CURSOR, $.name, $.FOR, $.row_source),
      seq($.DECLARE, $.name, $.CURSOR, $.FOR, $.expr),
      seq($.CURSOR, $.name, $.FOR, $.expr)),

    declare_fetched_value_cursor_stmt: $ => choice(
      seq($.DECLARE, $.name, $.CURSOR, $.FETCH, $.FROM, $.call_stmt),
      seq($.CURSOR, $.name, $.FETCH, $.FROM, $.call_stmt)),

    declare_type_stmt: $ => choice(
      seq($.DECLARE, $.name, $.TYPE, $.data_type_with_options),
      seq($.TYPE, $.name, $.data_type_with_options)),

    declare_vars_stmt: $ => choice(
      seq($.DECLARE, $.sql_name_list, $.data_type_with_options),
      seq($.VAR, $.name_list, $.data_type_with_options),
      $.declare_value_cursor),

    call_stmt: $ => seq($.CALL, $.loose_name, '(', optional($.arg_list), ')'),

    while_stmt: $ => seq($.WHILE, $.expr, $.BEGIN, optional($.stmt_list), $.END),

    switch_stmt: $ => choice(
      seq($.SWITCH, $.expr, $.switch_case, $.switch_cases),
      seq($.SWITCH, $.expr, $.ALL, $.VALUES, $.switch_case, $.switch_cases)),

    switch_case: $ => choice(
      seq($.WHEN, $.expr_list, $.THEN, $.stmt_list),
      seq($.WHEN, $.expr_list, $.THEN, $.NOTHING)),

    switch_cases: $ => choice(
      seq($.switch_case, $.switch_cases),
      seq($.ELSE, $.stmt_list, $.END),
      $.END),

    loop_stmt: $ => seq($.LOOP, $.fetch_stmt, $.BEGIN, optional($.stmt_list), $.END),

    leave_stmt: $ => $.LEAVE,

    return_stmt: $ => $.RETURN,

    rollback_return_stmt: $ => seq($.ROLLBACK, $.RETURN),

    commit_return_stmt: $ => seq($.COMMIT, $.RETURN),

    throw_stmt: $ => $.THROW,

    trycatch_stmt: $ => choice(
      seq(
          $.BEGIN,
          $.TRY,
          optional($.stmt_list),
          $.END,
          $.TRY,
          ';',
          $.BEGIN,
          $.CATCH,
          optional($.stmt_list),
          $.END,
          $.CATCH),
      seq($.TRY, optional($.stmt_list), $.CATCH, optional($.stmt_list), $.END)),

    continue_stmt: $ => $.CONTINUE,

    fetch_stmt: $ => choice(
      seq($.FETCH, $.name, $.INTO, $.name_list),
      seq($.FETCH, $.name)),

    fetch_values_stmt: $ => choice(
      seq(
          $.FETCH,
          $.name,
          optional($.opt_column_spec),
          $.FROM,
          $.VALUES,
          '(',
          optional($.insert_list),
          ')',
          optional($.opt_insert_dummy_spec)),
      seq($.FETCH, $.name, optional($.opt_column_spec), $.from_shape, optional($.opt_insert_dummy_spec)),
      seq($.FETCH, $.name, $.USING, $.expr_names, optional($.opt_insert_dummy_spec))),

    expr_names: $ => choice(
      $.expr_name,
      seq($.expr_name, ',', $.expr_names)),

    expr_name: $ => seq($.expr, $.as_alias),

    fetch_call_stmt: $ => seq($.FETCH, $.name, optional($.opt_column_spec), $.FROM, $.call_stmt),

    close_stmt: $ => seq($.CLOSE, $.name),

    out_stmt: $ => seq($.OUT, $.name),

    out_union_stmt: $ => seq($.OUT, $.UNION, $.name),

    out_union_parent_child_stmt: $ => seq($.OUT, $.UNION, $.call_stmt, $.JOIN, $.child_results),

    child_results: $ => choice(
      $.child_result,
      seq($.child_result, $.AND, $.child_results)),

    child_result: $ => choice(
      seq($.call_stmt, $.USING, '(', $.name_list, ')'),
      seq($.call_stmt, $.USING, '(', $.name_list, ')', $.AS, $.name)),

    if_stmt: $ => seq(
          $.IF,
          $.expr,
          $.THEN,
          optional($.stmt_list),
          optional($.elseif_list),
          optional($.opt_else),
          $.END, optional($.IF)),

    opt_else: $ => seq($.ELSE, optional($.stmt_list)),

    elseif_item: $ => seq($.ELSE_IF, $.expr, $.THEN, optional($.stmt_list)),

    elseif_list: $ => prec.left(choice(
      $.elseif_item,
      seq($.elseif_item, $.elseif_list))),

    control_stmt: $ => choice(
      $.commit_return_stmt,
      $.continue_stmt,
      $.leave_stmt,
      $.return_stmt,
      $.rollback_return_stmt,
      $.throw_stmt),

    guard_stmt: $ => seq($.IF, $.expr, $.control_stmt),

    transaction_mode: $ => choice(
      $.DEFERRED,
      $.IMMEDIATE,
      $.EXCLUSIVE),

    begin_trans_stmt: $ => choice(
      seq($.BEGIN, optional($.transaction_mode), $.TRANSACTION),
      seq($.BEGIN, optional($.transaction_mode))),

    rollback_trans_stmt: $ => choice(
      $.ROLLBACK,
      seq($.ROLLBACK, $.TRANSACTION),
      seq($.ROLLBACK, $.TO, $.savepoint_name),
      seq($.ROLLBACK, $.TRANSACTION, $.TO, $.savepoint_name),
      seq($.ROLLBACK, $.TO, $.SAVEPOINT, $.savepoint_name),
      seq($.ROLLBACK, $.TRANSACTION, $.TO, $.SAVEPOINT, $.savepoint_name)),

    commit_trans_stmt: $ => choice(
      seq($.COMMIT, $.TRANSACTION),
      $.COMMIT),

    proc_savepoint_stmt: $ => seq($.procedure, $.SAVEPOINT, $.BEGIN, optional($.stmt_list), $.END),

    savepoint_name: $ => choice(
      $.AT_PROC,
      $.name),

    savepoint_stmt: $ => seq($.SAVEPOINT, $.savepoint_name),

    release_savepoint_stmt: $ => choice(
      seq($.RELEASE, $.savepoint_name),
      seq($.RELEASE, $.SAVEPOINT, $.savepoint_name)),

    echo_stmt: $ => choice(
      seq($.AT_ECHO, $.name, ',', $.str_literal),
      seq($.AT_ECHO, $.name, ',', $.AT_TEXT, '(', $.text_args, ')')),

    alter_table_add_column_stmt: $ => seq($.ALTER, $.TABLE, $.sql_name, $.ADD, $.COLUMN, $.col_def),

    create_trigger_stmt: $ => seq(
          $.CREATE,
          optional($.opt_temp),
          $.TRIGGER,
          optional($.opt_if_not_exists),
          $.trigger_def,
          optional($.opt_delete_version_attr)),

    trigger_def: $ => seq(
          $.sql_name,
          optional($.trigger_condition),
          $.trigger_operation,
          $.ON,
          $.sql_name,
          $.trigger_action),

    trigger_condition: $ => choice(
      $.BEFORE,
      $.AFTER,
      seq($.INSTEAD, $.OF)),

    trigger_operation: $ => choice(
      $.DELETE,
      $.INSERT,
      seq($.UPDATE, optional($.opt_of))),

    opt_of: $ => seq($.OF, $.name_list),

    trigger_action: $ => seq(optional($.opt_foreachrow), optional($.opt_when_expr), $.BEGIN, $.trigger_stmts, $.END),

    opt_foreachrow: $ => $.FOR_EACH_ROW,

    opt_when_expr: $ => seq($.WHEN, $.expr),

    trigger_stmts: $ => choice(
      $.trigger_stmt,
      seq($.trigger_stmt, $.trigger_stmts)),

    trigger_stmt: $ => choice(
      seq($.trigger_update_stmt, ';'),
      seq($.trigger_insert_stmt, ';'),
      seq($.trigger_delete_stmt, ';'),
      seq($.trigger_select_stmt, ';')),

    trigger_select_stmt: $ => $.select_stmt_no_with,

    trigger_insert_stmt: $ => $.insert_stmt,

    trigger_delete_stmt: $ => $.delete_stmt,

    trigger_update_stmt: $ => $.basic_update_stmt,

    enforcement_options: $ => choice(
      seq($.FOREIGN, $.KEY, $.ON, $.UPDATE),
      seq($.FOREIGN, $.KEY, $.ON, $.DELETE),
      $.JOIN,
      seq($.UPSERT, $.STATEMENT),
      seq($.WINDOW, $.function),
      seq($.WITHOUT, $.ROWID),
      $.TRANSACTION,
      seq($.SELECT, $.IF, $.NOTHING),
      seq($.INSERT, $.SELECT),
      seq($.TABLE, $.FUNCTION),
      seq($.ENCODE, $.CONTEXT_COLUMN),
      seq($.ENCODE, $.CONTEXT_TYPE, $.INTEGER),
      seq($.ENCODE, $.CONTEXT_TYPE, $.LONG_INTEGER),
      seq($.ENCODE, $.CONTEXT_TYPE, $.REAL),
      seq($.ENCODE, $.CONTEXT_TYPE, $.BOOL),
      seq($.ENCODE, $.CONTEXT_TYPE, $.TEXT),
      seq($.ENCODE, $.CONTEXT_TYPE, $.BLOB),
      $.IS_TRUE,
      $.CAST,
      $.SIGN_FUNCTION,
      $.CURSOR_HAS_ROW,
      seq($.UPDATE, $.FROM),
      seq($.AND, $.OR, $.NOT, $.NULL, $.CHECK)),

    enforce_strict_stmt: $ => seq($.AT_ENFORCE_STRICT, $.enforcement_options),

    enforce_normal_stmt: $ => seq($.AT_ENFORCE_NORMAL, $.enforcement_options),

    enforce_reset_stmt: $ => $.AT_ENFORCE_RESET,

    enforce_push_stmt: $ => $.AT_ENFORCE_PUSH,

    enforce_pop_stmt: $ => $.AT_ENFORCE_POP,

    keep_table_name_in_aliases_stmt: $ => $.AT_KEEP_TABLE_NAME_IN_ALIASES,

    op_stmt: $ => choice(
      seq($.AT_OP, $.data_type_any, ':', $.loose_name, $.loose_name_or_type, $.AS, $.loose_name),
      seq($.AT_OP, $.CURSOR, ':', $.loose_name, $.loose_name_or_type, $.AS, $.loose_name),
      seq($.AT_OP, $.NULL, ':', $.loose_name, $.loose_name_or_type, $.AS, $.loose_name)),

    ifdef_stmt: $ => choice(
      seq($.AT_IFDEF, $.name, optional($.stmt_list), $.AT_ELSE, optional($.stmt_list), $.AT_ENDIF),
      seq($.AT_IFDEF, $.name, optional($.stmt_list), $.AT_ENDIF)),

    ifndef_stmt: $ => choice(
      seq($.AT_IFNDEF, $.name, optional($.stmt_list), $.AT_ELSE, optional($.stmt_list), $.AT_ENDIF),
      seq($.AT_IFNDEF, $.name, optional($.stmt_list), $.AT_ENDIF)),

    macro_def_stmt: $ => choice(
      seq(
          $.AT_MACRO,
          '(',
          $.EXPR,
          ')',
          $.name,
          '!',
          '(',
          optional($.macro_formals),
          ')',
          $.BEGIN,
          $.expr,
          $.END),
      seq(
          $.AT_MACRO,
          '(',
          $.STMT_LIST,
          ')',
          $.name,
          '!',
          '(',
          optional($.macro_formals),
          ')',
          $.BEGIN,
          $.stmt_list,
          $.END),
      seq(
          $.AT_MACRO,
          '(',
          $.QUERY_PARTS,
          ')',
          $.name,
          '!',
          '(',
          optional($.macro_formals),
          ')',
          $.BEGIN,
          $.query_parts,
          $.END),
      seq(
          $.AT_MACRO,
          '(',
          $.CTE_TABLES,
          ')',
          $.name,
          '!',
          '(',
          optional($.macro_formals),
          ')',
          $.BEGIN,
          $.cte_tables,
          $.END),
      seq(
          $.AT_MACRO,
          '(',
          $.SELECT_CORE,
          ')',
          $.name,
          '!',
          '(',
          optional($.macro_formals),
          ')',
          $.BEGIN,
          $.select_core_list,
          $.END),
      seq(
          $.AT_MACRO,
          '(',
          $.SELECT_EXPR,
          ')',
          $.name,
          '!',
          '(',
          optional($.macro_formals),
          ')',
          $.BEGIN,
          $.select_expr_list,
          $.END)),

    macro_arg: $ => choice(
      $.expr,
      seq($.BEGIN, $.stmt_list, $.END),
      seq($.FROM, '(', $.query_parts, ')'),
      seq($.WITH, '(', $.cte_tables, ')'),
      seq($.ROWS, '(', $.select_core_list, ')'),
      seq($.SELECT, '(', $.select_expr_list, ')')),

    macro_args: $ => choice(
      $.macro_arg,
      seq($.macro_arg, ',', $.macro_args)),

    macro_formals: $ => choice(
      $.macro_formal,
      seq($.macro_formal, ',', $.macro_formals)),

    macro_formal: $ => seq($.name, '!', $.macro_type),

    macro_type: $ => choice(
      $.EXPR,
      $.STMT_LIST,
      $.QUERY_PARTS,
      $.CTE_TABLES,
      $.SELECT_CORE,
      $.SELECT_EXPR),

    EXPLAIN: $ => CI('explain'),

    QUERY_PLAN: $ => prec.left(1, seq(CI('query'), CI('plan'))),

    AT_PREVIOUS_SCHEMA: $ => CI('@previous_schema'),

    AT_SCHEMA_UPGRADE_SCRIPT: $ => CI('@schema_upgrade_script'),

    AT_SCHEMA_UPGRADE_VERSION: $ => CI('@schema_upgrade_version'),

    SET: $ => CI('set'),

    FROM: $ => CI('from'),

    CURSOR: $ => CI('cursor'),

    LET: $ => CI('let'),

    CONST: $ => CI('const'),

    AT_RECREATE: $ => CI('@recreate'),

    AT_DELETE: $ => CI('@delete'),

    AT_CREATE: $ => CI('@create'),

    DROP: $ => CI('drop'),

    TABLE: $ => CI('table'),

    IF: $ => CI('if'),

    EXISTS: $ => CI('exists'),

    VIEW: $ => CI('view'),

    INDEX: $ => CI('index'),

    TRIGGER: $ => CI('trigger'),

    CREATE: $ => CI('create'),

    VIRTUAL: $ => CI('virtual'),

    USING: $ => CI('using'),

    AS: $ => CI('as'),

    ARGUMENTS: $ => CI('arguments'),

    FOLLOWING: $ => CI('following'),

    TEMP: $ => CI('temp'),

    NOT: $ => CI('not'),

    WITHOUT: $ => CI('without'),

    ROWID: $ => CI('rowid'),

    AT_EPONYMOUS: $ => CI('@eponymous'),

    CONSTRAINT: $ => CI('constraint'),

    CHECK: $ => CI('check'),

    LIKE: $ => CI('like'),

    AT_ATTRIBUTE: $ => CI('@attribute'),

    PRIMARY: $ => CI('primary'),

    KEY: $ => CI('key'),

    ON_CONFLICT: $ => prec.left(1, seq(CI('on'), CI('conflict'))),

    ROLLBACK: $ => CI('rollback'),

    ABORT: $ => CI('abort'),

    FAIL: $ => CI('fail'),

    IGNORE: $ => CI('ignore'),

    REPLACE: $ => CI('replace'),

    ON: $ => CI('on'),

    DELETE: $ => CI('delete'),

    UPDATE: $ => CI('update'),

    NULL: $ => CI('null'),

    DEFAULT: $ => CI('default'),

    CASCADE: $ => CI('cascade'),

    RESTRICT: $ => CI('restrict'),

    NO: $ => CI('no'),

    ACTION: $ => CI('action'),

    DEFERRABLE: $ => CI('deferrable'),

    NOT_DEFERRABLE: $ => prec.left(1, seq(CI('not'), CI('deferrable'))),

    INITIALLY: $ => CI('initially'),

    DEFERRED: $ => CI('deferred'),

    IMMEDIATE: $ => CI('immediate'),

    FOREIGN: $ => CI('foreign'),

    REFERENCES: $ => CI('references'),

    UNIQUE: $ => CI('unique'),

    ADD: $ => CI('add'),

    AFTER: $ => CI('after'),

    ALTER: $ => CI('alter'),

    ASC: $ => CI('asc'),

    AT_ID: $ => CI('@id'),

    AT_TMP: $ => CI('@tmp'),

    AUTOINCREMENT: $ => CI('autoincrement'),

    BEFORE: $ => CI('before'),

    COLUMN: $ => CI('column'),

    CTE_TABLES: $ => CI('cte_tables'),

    DESC: $ => CI('desc'),

    ENCODE: $ => CI('encode'),

    EXCLUSIVE: $ => CI('exclusive'),

    EXPR: $ => CI('expr'),

    FETCH: $ => CI('fetch'),

    FIRST: $ => CI('first'),

    GROUPS: $ => CI('groups'),

    HIDDEN: $ => CI('hidden'),

    INSTEAD: $ => CI('instead'),

    INTO: $ => CI('into'),

    LAST: $ => CI('last'),

    NULLS: $ => CI('nulls'),

    OUTER: $ => CI('outer'),

    PARTITION: $ => CI('partition'),

    PRECEDING: $ => CI('preceding'),

    PRIVATE: $ => CI('private'),

    QUERY_PARTS: $ => CI('query_parts'),

    RANGE: $ => CI('range'),

    RELEASE: $ => CI('release'),

    RENAME: $ => CI('rename'),

    SAVEPOINT: $ => CI('savepoint'),

    SELECT_CORE: $ => CI('select_core'),

    SELECT_EXPR: $ => CI('select_expr'),

    STATEMENT: $ => CI('statement'),

    STMT_LIST: $ => CI('stmt_list'),

    TEXT: $ => CI('text'),

    TRANSACTION: $ => CI('transaction'),

    TYPE: $ => CI('type'),

    CALL: $ => CI('call'),

    BOOL: $ => CI('bool'),

    INT: $ => CI('int'),

    LONG: $ => CI('long'),

    REAL: $ => CI('real'),

    BLOB: $ => CI('blob'),

    OBJECT: $ => CI('object'),

    RIGHT: $ => CI('right'),

    LEFT: $ => CI('left'),

    ALL: $ => CI('all'),

    COLLATE: $ => CI('collate'),

    AT_SENSITIVE: $ => CI('@sensitive'),

    INTEGER: $ => CI('integer'),

    LONG_INT: $ => CI('long_int'),

    LONG_INTEGER: $ => CI('long_integer'),

    TRUE: $ => CI('true'),

    FALSE: $ => CI('false'),

    AT_FILE: $ => CI('@file'),

    AT_LINE: $ => CI('@line'),

    AT_MACRO_LINE: $ => CI('@macro_line'),

    AT_MACRO_FILE: $ => CI('@macro_file'),

    AT_PROC: $ => CI('@proc'),

    AT_TEXT: $ => CI('@text'),

    RAISE: $ => CI('raise'),

    DISTINCT: $ => CI('distinct'),

    GLOB: $ => CI('glob'),

    AT_RC: $ => CI('@rc'),

    NOTHING: $ => CI('nothing'),

    THEN: $ => CI('then'),

    OR: $ => CI('or'),

    THROW: $ => CI('throw'),

    CASE: $ => CI('case'),

    END: $ => CI('end'),

    ELSE: $ => CI('else'),

    CAST: $ => CI('cast'),

    TYPE_CHECK: $ => CI('type_check'),

    IS_NOT_TRUE: $ => prec.left(1, seq(CI('is'), CI('not'), CI('true'))),

    IS_NOT_FALSE: $ => prec.left(1, seq(CI('is'), CI('not'), CI('false'))),

    ISNULL: $ => CI('isnull'),

    NOTNULL: $ => CI('notnull'),

    IS_TRUE: $ => prec.left(1, seq(CI('is'), CI('true'))),

    IS_FALSE: $ => prec.left(1, seq(CI('is'), CI('false'))),

    NOT_IN: $ => prec.left(1, seq(CI('not'), CI('in'))),

    IN: $ => CI('in'),

    NOT_LIKE: $ => prec.left(1, seq(CI('not'), CI('like'))),

    MATCH: $ => CI('match'),

    NOT_MATCH: $ => prec.left(1, seq(CI('not'), CI('match'))),

    REGEXP: $ => CI('regexp'),

    NOT_REGEXP: $ => prec.left(1, seq(CI('not'), CI('regexp'))),

    NOT_GLOB: $ => prec.left(1, seq(CI('not'), CI('glob'))),

    BETWEEN: $ => CI('between'),

    AND: $ => CI('and'),

    NOT_BETWEEN: $ => prec.left(1, seq(CI('not'), CI('between'))),

    IS_NOT: $ => prec.left(1, seq(CI('is'), CI('not'))),

    IS: $ => CI('is'),

    WHEN: $ => CI('when'),

    AT_COLUMNS: $ => CI('@columns'),

    WITH: $ => CI('with'),

    RECURSIVE: $ => CI('recursive'),

    SELECT: $ => CI('select'),

    ROWS: $ => CI('rows'),

    VALUES: $ => CI('values'),

    UNION: $ => CI('union'),

    UNION_ALL: $ => prec.left(1, seq(CI('union'), CI('all'))),

    INTERSECT: $ => CI('intersect'),

    EXCEPT: $ => CI('except'),

    OVER: $ => CI('over'),

    FILTER: $ => CI('filter'),

    EXCLUDE_NO_OTHERS: $ => prec.left(1, seq(CI('exclude'), CI('no'), CI('others'))),

    EXCLUDE_CURRENT_ROW: $ => prec.left(1, seq(CI('exclude'), CI('current'), CI('row'))),

    EXCLUDE_GROUP: $ => prec.left(1, seq(CI('exclude'), CI('group'))),

    EXCLUDE_TIES: $ => prec.left(1, seq(CI('exclude'), CI('ties'))),

    UNBOUNDED: $ => CI('unbounded'),

    CURRENT_ROW: $ => prec.left(1, seq(CI('current'), CI('row'))),

    BY: $ => CI('by'),

    WINDOW: $ => CI('window'),

    AT_DECLARE_SCHEMA_REGION: $ => CI('@declare_schema_region'),

    AT_DECLARE_DEPLOYABLE_REGION: $ => CI('@declare_deployable_region'),

    AT_BEGIN_SCHEMA_REGION: $ => CI('@begin_schema_region'),

    AT_END_SCHEMA_REGION: $ => CI('@end_schema_region'),

    AT_UNSUB: $ => CI('@unsub'),

    AT_SCHEMA_AD_HOC_MIGRATION: $ => CI('@schema_ad_hoc_migration'),

    FOR: $ => CI('for'),

    AT_EMIT_ENUMS: $ => CI('@emit_enums'),

    AT_EMIT_GROUP: $ => CI('@emit_group'),

    AT_EMIT_CONSTANTS: $ => CI('@emit_constants'),

    WHERE: $ => CI('where'),

    GROUP: $ => CI('group'),

    HAVING: $ => CI('having'),

    ORDER: $ => CI('order'),

    LIMIT: $ => CI('limit'),

    OFFSET: $ => CI('offset'),

    DISTINCTROW: $ => CI('distinctrow'),

    INNER: $ => CI('inner'),

    CROSS: $ => CI('cross'),

    JOIN: $ => CI('join'),

    AT_DUMMY_SEED: $ => CI('@dummy_seed'),

    AT_DUMMY_NULLABLES: $ => CI('@dummy_nullables'),

    AT_DUMMY_DEFAULTS: $ => CI('@dummy_defaults'),

    INSERT: $ => CI('insert'),

    RETURNING: $ => CI('returning'),

    DO: $ => CI('do'),

    FUNC: $ => CI('func'),

    FUNCTION: $ => CI('function'),

    DECLARE: $ => CI('declare'),

    OUT: $ => CI('out'),

    ENUM: $ => CI('enum'),

    BEGIN: $ => CI('begin'),

    PROC: $ => CI('proc'),

    PROCEDURE: $ => CI('procedure'),

    INTERFACE: $ => CI('interface'),

    INOUT: $ => CI('inout'),

    VAR: $ => CI('var'),

    WHILE: $ => CI('while'),

    SWITCH: $ => CI('switch'),

    LOOP: $ => CI('loop'),

    LEAVE: $ => CI('leave'),

    RETURN: $ => CI('return'),

    COMMIT: $ => CI('commit'),

    TRY: $ => CI('try'),

    CATCH: $ => CI('catch'),

    CONTINUE: $ => CI('continue'),

    CLOSE: $ => CI('close'),

    TO: $ => CI('to'),

    AT_ECHO: $ => CI('@echo'),

    OF: $ => CI('of'),

    FOR_EACH_ROW: $ => prec.left(1, seq(CI('for'), CI('each'), CI('row'))),

    UPSERT: $ => CI('upsert'),

    CONTEXT_COLUMN: $ => prec.left(1, seq(CI('context'), CI('column'))),

    CONTEXT_TYPE: $ => prec.left(1, seq(CI('context'), CI('type'))),

    SIGN_FUNCTION: $ => prec.left(1, seq(CI('sign'), CI('function'))),

    CURSOR_HAS_ROW: $ => prec.left(1, seq(CI('cursor'), CI('has'), CI('row'))),

    AT_ENFORCE_STRICT: $ => CI('@enforce_strict'),

    AT_ENFORCE_NORMAL: $ => CI('@enforce_normal'),

    AT_ENFORCE_RESET: $ => CI('@enforce_reset'),

    AT_ENFORCE_PUSH: $ => CI('@enforce_push'),

    AT_ENFORCE_POP: $ => CI('@enforce_pop'),

    AT_KEEP_TABLE_NAME_IN_ALIASES: $ => CI('@keep_table_name_in_aliases'),

    AT_OP: $ => CI('@op'),

    AT_IFDEF: $ => CI('@ifdef'),

    AT_ELSE: $ => CI('@else'),

    AT_ENDIF: $ => CI('@endif'),

    AT_IFNDEF: $ => CI('@ifndef'),

    AT_MACRO: $ => CI('@macro'),

/* This has to go last so that it is less favorable than keywords */
    ID: $ => /[_A-Za-z][A-Za-z0-9_]*/,
  }
});

// The all important "make case-insensitive token" function
// This is used on virtually every terminal symbol in the grammar.
function CI (keyword) {
  return new RegExp(keyword, "i");
}
