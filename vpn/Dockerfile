FROM ubuntu:18.04

# Suporte a 32 bits e dependências
RUN dpkg --add-architecture i386 && \
    apt-get update && \
    apt-get install -y \
        wget \
        libc6:i386 \
        libstdc++6:i386 \
        libpam0g:i386 \
        libx11-6:i386 \
        lib32z1 \
        lib32ncurses6 \
        qemu-user \
        iproute2 \
        net-tools \
        sudo && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /vpn

# Copia o script de instalação do SNX
COPY snx_install.sh .

RUN chmod +x snx_install.sh && ./snx_install.sh

ENTRYPOINT ["snx"]
