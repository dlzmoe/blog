import toml
import yaml

def toml_to_yaml(toml_str):
    # 解析 TOML 格式字符串
    toml_data = toml.loads(toml_str)

    # 将解析后的数据转为 YAML 格式字符串
    yaml_str = yaml.dump(toml_data, default_flow_style=False)

    return yaml_str

def toml_file_to_yaml_file(input_file, output_file):
    # 从 TOML 文件中读取内容
    with open(input_file, 'r') as f:
        toml_str = f.read()

    # 将 TOML 格式字符串转为 YAML 格式字符串
    yaml_str = toml_to_yaml(toml_str)

    # 将 YAML 格式字符串写入到文件中
    with open(output_file, 'w') as f:
        f.write(yaml_str)

# 使用示例
toml_file_to_yaml_file('config.toml', 'config.yaml')
