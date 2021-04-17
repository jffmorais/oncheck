export interface ReqI {
    id?: string;
    colab_id: string;
    colab_nome: string;
    colab_reg: string;
    data: any;
    data_devolucao?: any;
    item_desc: string;
    item_id: string;
    item_modelo: string;
    status: string;
    item_imagem: string;
    item_numero: string;
    data_form?: Date;
    data_devolucao_form?: Date;
    status_color?: string;
    obs?: string;
}
